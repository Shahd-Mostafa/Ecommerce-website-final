import { Component, inject } from '@angular/core';
import { OrdersService } from '../core/services/orders.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent {
  private readonly _OrdersService = inject(OrdersService);
  getOrder(id: string): void {
    this._OrdersService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
