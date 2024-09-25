import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  private readonly _Router = inject(Router);
  orders: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });
  cartId: string | null = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
    });
  }
  orderSubmit(): void {
    this._OrdersService.checkout(this.cartId, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        // let cleanUrl = res.session.success_url.replace(/([^:]\/)\/+/g, '$1');
        if (res.status === 'success') {
          // alert(res.session.success_url);
          // alert(cleanUrl);
          location.href = res.session.url;
          console.log(res.session.url);
          console.log(res.session.success_url);
          console.log('loaded successfully');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
