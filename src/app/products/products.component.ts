import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductsService } from '../core/services/products.service';
import { CartService } from '../core/services/cart.service';
import { WishlistService } from '../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IProducts } from '../core/interfaces/iproducts';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../core/pipes/filter.pipe';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule, FilterPipe, LowerCasePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  clicked: { [key: string]: boolean } = {};
  productsList: IProducts[] = [];
  searchTerm: string = '';
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productsList = res.data;
        this.productsList.forEach((product) => {
          this.clicked[product.id] = false;
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
        console.log(res);
        this._ToastrService.success(res.message, 'Success');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  addWishlist(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Success');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  toggleWishlistIcon(event: MouseEvent, id: string): void {
    let target = event.target as HTMLElement;
    if (this.clicked[id]) {
      target.classList.remove('fa-solid');
      target.classList.add('fa-regular');
    } else {
      target.classList.remove('fa-regular');
      target.classList.add('fa-solid');
    }
    this.clicked[id] = !this.clicked[id];
  }
}
