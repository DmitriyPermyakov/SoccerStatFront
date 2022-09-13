import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RegisterRequest } from '../interfaces/interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private authSubscription: Subscription;

  constructor(private router: Router, private auth: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  toMainPage() {
    this.router.navigate(['/leagues'])
  }
  clear() {
    this.form.reset();
  }

  submit() {
    const regRequest: RegisterRequest = {
      email: this.form.value.email,
      password: this.form.value.password,
      passwordConfirm: this.form.value.passwordConfirm
    }

    this.authSubscription = this.auth.register(regRequest)
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/leagues']);
      },
      (error) => console.log(error));
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
