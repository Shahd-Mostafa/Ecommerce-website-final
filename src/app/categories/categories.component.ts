import { Component, inject } from '@angular/core';
import { CategoriesService } from '../core/services/categories.service';
import { SubcategoriesService } from '../core/services/subcategories.service';
import { ICategories } from '../core/interfaces/icategories';
import { ISubcategories } from '../core/interfaces/isubcategories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _SubcategoriesService = inject(SubcategoriesService);
  categoriesList: ICategories[] = [];
  selectedCategory: ICategories | null = null;
  subcategoriesList: ISubcategories[] = [];
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
  revealCategories(category: ICategories): void {
    this.selectedCategory = category;
  }
  getSubcategories(id: string): void {
    this._SubcategoriesService.getSubcategoriesOfCategory(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.subcategoriesList = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
