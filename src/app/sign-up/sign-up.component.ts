import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  showPass1?: boolean;
  showPass2?: boolean;
  msgError: string = '';
  isLoading: boolean = false;
  SignUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );
  signUpSubmit(): void {
    if (this.SignUpForm.valid) {
      this.isLoading = true;
      this._AuthService.setSignUpForm(this.SignUpForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this._Router.navigate(['/sign-in']);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoading = false;
        },
      });
      // console.log(this.SignUpForm.value);
    }
  }
  confirmPassword(t: AbstractControl) {
    if (t.get('password')?.value === t.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  togglePasswordEye(): void {
    this.showPass1 = !this.showPass1;
  }
  togglePasswordEye2(): void {
    this.showPass2 = !this.showPass2;
  }
}
