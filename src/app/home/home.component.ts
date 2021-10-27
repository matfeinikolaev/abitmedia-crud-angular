import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service.ts.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<any> = [];
  newProduct: any = {};
  constructor(private productService: ProductService) { }

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

  addProduct() {
    this.newProduct.dateTime = new Date().valueOf();
    this.productService.createProduct(this.newProduct);
    this.newProduct = {};
  }

  deleteProduct(key: any) {
    this.productService.removeProduct(key);
  }

  updateProduct(p: any) {
    console.log(p);
    this.productService.updateProduct(p);
  }
}
