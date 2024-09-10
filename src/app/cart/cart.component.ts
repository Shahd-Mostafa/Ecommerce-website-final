import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddCart, ICart } from '../core/interfaces/icart';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private readonly _CartService = inject(CartService);
  cartDetails: ICart = {} as ICart;
  cart: AddCart = {} as AddCart;
  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this.cart = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  removeItem(id: string): void {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.cart = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  clearCart(): void {
    this._CartService.deleteCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartDetails = {
            _id: '',
            cartOwner: '',
            products: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0,
            totalCartPrice: 0,
          } as ICart;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  updateCount(id: string, newCount: number): void {
    this._CartService.updateProductQuantity(id, newCount).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
