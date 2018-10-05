import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../order/order';
import { IProduct } from '../products/product';

@Injectable()
export class CartService {
  constructor() { }
  public order: Order = new Order();
  public products: IProduct[] = [];

  public addToOrder(newProduct: IProduct) {
    let item: OrderItem = this.order.items
      .find(i => i.productId == newProduct.id);

    if (item) {
      item.quantity++
    }

    else {
      item = new OrderItem()
      item.productId = newProduct.id;
      item.productName = newProduct.name;
      item.unitPrice = newProduct.price;
      item.quantity = 1;
      this.order.items.push(item);
    }

    this.order.subtotal = this.order.getSubtotal();

    localStorage.setItem("cart", JSON.stringify(this.order));
  }

  getCart(): string {
    return localStorage.getItem("cart");
  }

  clearCart() {
    this.order = new Order();
    localStorage.setItem("cart", JSON.stringify(this.order));
  }
}
