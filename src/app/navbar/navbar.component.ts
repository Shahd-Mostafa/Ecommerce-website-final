import { Component, inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { AddCart, ICart } from '../core/interfaces/icart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  counter: number = 0;
  getproducts(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
      },
    });
  }
  ngOnInit(): void {
    this.getproducts();
    this._CartService.cartCounter.subscribe({
      next: (counter) => {
        this.counter = counter;
      },
    });
  }
}
