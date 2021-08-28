import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = {
    icon: 'visibility_off',
    inputType: 'password',
  };

  toggleShowPassword(): void {
    if (this.showPassword.inputType === 'password') {
      this.showPassword.inputType = 'text';
      this.showPassword.icon = 'visibility';
    } else {
      this.showPassword.inputType = 'password';
      this.showPassword.icon = 'visibility_off';
    }
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  async onLogin(): Promise<void> {
    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;
    if (this.loginForm.valid) {
      await this.authService.login(username, password);
    }
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
}
