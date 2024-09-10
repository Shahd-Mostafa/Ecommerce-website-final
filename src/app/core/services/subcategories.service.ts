import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  private readonly _HttpClient = inject(HttpClient);
  getSubcategoriesOfCategory(id: string): Observable<any> {
    return this._HttpClient.get(
      `${enviroment.baseUrl}/api/v1/categories/${id}/subcategories`
    );
  }
}
