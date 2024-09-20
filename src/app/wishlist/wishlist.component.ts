import { Component, inject } from '@angular/core';
import { WishlistService } from '../core/services/wishlist.service';
import { CartService } from '../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IWishlist } from '../core/interfaces/iwishlist';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  wishlistDetails: IWishlist[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishlistProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishlistDetails = res.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  removeWishlistItem(id: string): void {
    this._WishlistService.deleteSpecificWishlistItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistDetails = res.data;
      },
      error: (error) => {
        console.error(error);
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
}
