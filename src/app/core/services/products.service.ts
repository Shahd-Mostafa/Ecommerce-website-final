import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _HttpClient = inject(HttpClient);
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/products`);
  }
  getSpecificProduct(id: string | null): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/products/${id}`);
  }
}
