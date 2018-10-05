import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  constructor(public router: Router, private cartService: CartService) { }

  onClearCart() {
    this.cartService.clearCart();
  }

  onCheckout() {
    //this.data.checkout()
    //  .subscribe(success => {
    //    if (success) {
    //      this.router.navigate(["/"]);
    //    }
    //  }, error => this.errorMessage = "Error al guardar compra.");
    this.successMessage = "Compra registrada.";
    this.cartService.clearCart();
  }

  ngOnInit() {
  }
}
