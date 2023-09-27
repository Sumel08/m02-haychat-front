import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  loginForm: FormGroup = new FormGroup<any>({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  constructor(
    private fireAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  async onSubmit() {
    console.log(this.loginForm.value);
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password,
      );
      await this.router.navigateByUrl('');
    } catch (error: any) {
      console.log(error);
      this.snackBar.open(error.toString(), '', { duration: 3000 });
    }
  }
}
