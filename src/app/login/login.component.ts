import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRequest, Token } from '../interfaces/interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public form: FormGroup;

  private loginSubsription: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {

  }

  submit() {
    if(!this.form.valid) {
      console.log("invalid form")
    }
    const loginRequest: LoginRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    console.log(loginRequest);
    this.loginSubsription = this.auth.login(loginRequest)
      .subscribe(
        (response:Token) => {
          this.auth.setToken(response);
        },
        (error) => {
          console.log(error)
        }
      )
  }
  clear() {
    this.form.reset();
  }

  toMainPage() {
    this.router.navigate(['/leagues']);
  }
}
