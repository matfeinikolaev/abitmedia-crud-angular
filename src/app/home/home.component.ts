import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service.ts.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<any> = [];
  newProduct: any = {
    title: "",
    description: "",
    price: null,
    quantiy: null,
  };
  @ViewChild("titleElement") titleElement: any;
  @ViewChild("descriptionElement") descriptionElement: any;
  @ViewChild("priceElement") priceElement: any;
  @ViewChild("quantityElement") quantityElement: any;
  @ViewChild("productImage") productImage: any;
  constructor(
    private productService: ProductService,
    private afStorage: AngularFireStorage,
    ) { }

  ngOnInit(): void {
    console.log("starting");
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().valueChanges().subscribe((snapshot: any) => {
      this.products = snapshot;
      this.products.sort((a, b) => b.dateTime - a.dateTime);
      console.log(this.products);
    });
  }

  changeImage(p: any) {
    console.log(document.getElementById(p.key + "-image")?.click());
  }

  addImage(e: any, p: any) {
    let selectedFile = e.target.files.item(0);
    let path = '/users/' + Date.now() + `_${selectedFile.name}`;
    let ref = this.afStorage.ref(path)
    ref.put(selectedFile).then(() => {
      ref.getDownloadURL().subscribe((data: any) => {
        p.photoURL = data;
      });
    });
  }

  addProduct() {
    this.titleElement.nativeElement.classList.remove("bg-danger");
    this.descriptionElement.nativeElement.classList.remove("bg-danger");
    this.priceElement.nativeElement.classList.remove("bg-danger"); 
    this.quantityElement.nativeElement.classList.remove("bg-danger");
    
    if (this.newProduct.title != "" && this.newProduct.description != "" && this.newProduct.price != null && this.newProduct.quantity != null) {
      let selectedFile = this.productImage.nativeElement.files.item(0);
      let path = '/users/' + Date.now() + `_${selectedFile.name}`;
      let ref = this.afStorage.ref(path)
      ref.put(selectedFile).then(() => {
        ref.getDownloadURL().subscribe((data: any) => {
          this.newProduct.photoURL = data;
          this.newProduct.dateTime = new Date().valueOf();
          this.productService.createProduct(this.newProduct);
          this.newProduct = {
            title: "",
            description: "",
            price: null,
            quantiy: null,
          };
        });
      }).catch((err: Error) => {
        console.log(err)
      });

    } else {
      if (this.newProduct.title == "") this.titleElement.nativeElement.classList.add("bg-danger");
      if (this.newProduct.description == "") this.descriptionElement.nativeElement.classList.add("bg-danger");
      if (this.newProduct.price == null) this.priceElement.nativeElement.classList.add("bg-danger");
      if (this.newProduct.quantity == null) this.quantityElement.nativeElement.classList.add("bg-danger");
    }
  }

  deleteProduct(key: any) {
    this.productService.removeProduct(key);
  }

  updateProduct(p: any) {
    console.log(p);
    this.productService.updateProduct(p);
  }
}
