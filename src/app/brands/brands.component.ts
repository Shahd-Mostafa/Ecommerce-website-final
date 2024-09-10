import { Component, inject } from '@angular/core';
import { BrandsService } from '../core/services/brands.service';
import { IBrands } from '../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService);
  brandsList: IBrands[] = [];
  selectedBrand: IBrands | null = null;
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  openModal(brand: IBrands): void {
    this.selectedBrand = brand;
  }
  getBrand(id: string): void {
    this._BrandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        console.log(res);
        this.selectedBrand = res.data;
      },
    });
  }
}
