import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  showPass?: boolean;
  msgError: string = '';
  isLoading: boolean = false;
  SignInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  signInSubmit(): void {
    if (this.SignInForm.valid) {
      this.isLoading = true;
      this._AuthService.setSignInForm(this.SignInForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            localStorage.setItem('userToken', res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
  togglePasswordEye(): void {
    this.showPass = !this.showPass;
  }
}
