import { ICategories } from './../core/interfaces/icategories';
import { Component, inject } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: ICategories[] = [];
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
