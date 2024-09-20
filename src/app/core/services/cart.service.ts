import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);
  cartCounter: BehaviorSubject<number> = new BehaviorSubject(0);
  myHeaders: any = { token: localStorage.getItem('userToken') };
  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: this.myHeaders,
      }
    );
  }
  getCartProducts(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/cart`, {
      headers: this.myHeaders,
    });
  }
  deleteSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseUrl}/api/v1/cart/${id}`, {
      headers: this.myHeaders,
    });
  }
  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `${enviroment.baseUrl}/api/v1/cart/${id}`,
      {
        count: newCount,
      },
      {
        headers: this.myHeaders,
      }
    );
  }
  deleteCart(): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseUrl}/api/v1/cart`, {
      headers: this.myHeaders,
    });
  }
}
