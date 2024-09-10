import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly _HttpClient = inject(HttpClient);
  myHeaders: any = { token: localStorage.getItem('userToken') };
  checkout(id: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${enviroment.urlServer}`,
      { shippingAddress: shippingDetails },
      {
        headers: this.myHeaders,
      }
    );
  }
  getUserOrders(id: string) {
    return this._HttpClient.get(
      `${enviroment.baseUrl}/api/v1/orders/user/${id}`
    );
  }
}
