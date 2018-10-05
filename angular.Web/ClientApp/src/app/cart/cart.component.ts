import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '../order/order';
import { IProduct } from '../products/product';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ngOnInit() {
    this.cartService.order = JSON.parse(this.cartService.getCart());
  }
  constructor(private cartService: CartService) { }
}
