import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/iproducts';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(productlist: IProducts[], word: string): IProducts[] {
    return productlist.filter(function (prod) {
      return prod.title.toLocaleLowerCase().includes(word.toLocaleLowerCase());
    });
  }
}
