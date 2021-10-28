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
    if (selectedFile != null) this.uploadImage(selectedFile).then(res => p.photoURL = res);
  }

  uploadImage(selectedFile: any) {
    return new Promise((resolve, reject) => {
      let path = '/users/' + Date.now() + `_${selectedFile.name}`;
      let ref = this.afStorage.ref(path)
      ref.put(selectedFile).then(() => {
        ref.getDownloadURL().subscribe((data: any) => {
          resolve(data);
        });
      });
    })
  }

  createProduct() {
    this.productService.createProduct(this.newProduct);
    this.newProduct = {
      title: "",
      description: "",
      price: null,
      quantiy: null,
    };
  }

  addProduct() {
    console.log(this.titleElement)
    this.titleElement.el.classList.remove("bg-danger");
    this.descriptionElement.el.classList.remove("bg-danger");
    this.priceElement.el.classList.remove("bg-danger"); 
    this.quantityElement.el.classList.remove("bg-danger");
    if (this.newProduct.title != "" && this.newProduct.description != "" && this.newProduct.price != null && this.newProduct.quantity != null) {
      let selectedFile = this.productImage.nativeElement.files.item(0);
      if (selectedFile != null) {
        this.uploadImage(selectedFile).then(res => {
          this.newProduct.photoURL = res;
          this.newProduct.dateTime = new Date().valueOf();
          this.createProduct();
        });
      } else {
        this.newProduct.dateTime = new Date().valueOf();
        this.createProduct();
      }
    } else {
      if (this.newProduct.title == "") this.titleElement.el.classList.add("bg-danger");
      if (this.newProduct.description == "") this.descriptionElement.el.classList.add("bg-danger");
      if (this.newProduct.price == null) this.priceElement.el.classList.add("bg-danger");
      if (this.newProduct.quantity == null) this.quantityElement.el.classList.add("bg-danger");
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
