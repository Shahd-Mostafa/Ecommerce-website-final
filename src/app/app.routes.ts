import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BodyLayoutComponent } from './body-layout/body-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { DetailsComponent } from './details/details.component';
import { OrdersComponent } from './orders/orders.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoadingComponent } from './loading/loading.component';
import { AllordersComponent } from './allorders/allorders.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent, title: 'Signin' },
      { path: 'sign-up', component: SignUpComponent, title: 'Signup' },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
    ],
  },
  {
    path: '',
    component: BodyLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      { path: 'cart', component: CartComponent, title: 'cart' },
      { path: 'wishlist', component: WishlistComponent, title: 'wishlist' },
      { path: 'products', component: ProductsComponent, title: 'products' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'brands' },
      { path: 'details/:id', component: DetailsComponent, title: 'details' },
      { path: 'orders/:id', component: OrdersComponent, title: 'order' },
      { path: 'loading', component: LoadingComponent, title: 'Loading' },
      { path: 'allorders', component: AllordersComponent, title: 'sent' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'Page Not Found' },
];
