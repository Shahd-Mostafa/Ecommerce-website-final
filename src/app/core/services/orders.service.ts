import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  // getUserOrders(id: string | null): Observable<any> {
  //   return this._HttpClient.get(
  //     `${enviroment.baseUrl}/api/v1/orders/user/${id}`
  //   );
  // }
  getUserOrders(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `${enviroment.baseUrl}/api/v1/orders/user/${id}`
    );
    // .pipe(
    //   map((response) => {
    //     const orders = response.orders;
    //     if (orders && orders.length > 0) {
    //       return orders[orders.length - 1];
    //     } else {
    //       return null;
    //     }
    //   })
    // );
  }
}
