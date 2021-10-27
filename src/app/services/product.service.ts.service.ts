import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { }

  getProducts() {
    return this.db.list('products/');
  }

  createProduct(product: any) {
    product.key = this.db.createPushId();
    console.log(product);
    return this.db.object('products/' + product.key).set(product);
  }

  updateProduct(product: any) {
    return this.db.object("products/" + product.key).update(product);
  }

  removeProduct(key: any) {
    return this.db.object("products/" + key).remove();
  }
}
