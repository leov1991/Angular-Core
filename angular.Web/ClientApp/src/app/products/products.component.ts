import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductsService } from './products.service';
import { error } from 'protractor';
import { OrderItem } from '../order/order';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList: IProduct[];

  constructor(private productsService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.productsService.getProducts().subscribe(prodFromWS => {
      this.productsList = prodFromWS,
        error => console.error(error);
    });
  }

  delete(product: IProduct) {
    this.productsService.deleteProduct(product.id.toString())
      .subscribe(product => this.loadData(), error => console.error(error));
  }

  addProduct(product: IProduct) {
    this.cartService.addToOrder(product);
  }
}
