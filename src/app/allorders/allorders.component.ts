import { IOrder } from './../core/interfaces/iorder';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../core/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent {
  private readonly _OrdersService = inject(OrdersService);
  order: IOrder = {} as IOrder;
  cartOwnerId: string | null = localStorage.getItem('cartOwnerId');
  ngOnInit(): void {
    this.getOrder(this.cartOwnerId);
  }
  getOrder(id: string | null): void {
    this._OrdersService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        console.log('loaded successfully');
        console.log(res[res.length - 1]);
        this.order = res[res.length - 1];
        for (var i = 0; i < this.order.cartItems.length; i++) {
          console.log(this.order.cartItems[i]);
        }
      },
      error: (error) => {
        console.error(error);
        console.log('loaded unsuccessfully');
      },
    });
  }
}
