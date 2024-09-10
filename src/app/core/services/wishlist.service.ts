import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  myHeaders: any = { token: localStorage.getItem('userToken') };
  getWishlistProducts(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/wishlist`, {
      headers: this.myHeaders,
    });
  }
  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: this.myHeaders,
      }
    );
  }
  deleteSpecificWishlistItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${enviroment.baseUrl}/api/v1/wishlist/${id}`,
      {
        headers: this.myHeaders,
      }
    );
  }
}
