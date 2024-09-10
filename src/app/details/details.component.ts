import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ProductsService } from '../core/services/products.service';
import { CartService } from '../core/services/cart.service';
import { WishlistService } from '../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IProducts } from '../core/interfaces/iproducts';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  detailsProduct: IProducts = {} as IProducts;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (t) => {
        let idProduct = t.get('id');
        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next: (res) => {
            console.log(res);
            this.detailsProduct = res.data;
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
    });
  }
  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
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
}
