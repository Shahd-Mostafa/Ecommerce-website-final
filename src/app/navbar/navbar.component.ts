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
}
