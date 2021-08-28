import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CustomValidators} from '../../../shared/custom-validators';
import {AuthService} from '../../../services/auth.service';
import {AlertState} from '../../../shared/alert-state';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  signupResult: { state: AlertState; message: string };
  showPassword = false;
  showRePassword = false;
  signupForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowRePassword(): void {
    this.showRePassword = !this.showRePassword;
  }

  get togglePasswordIcon(): string {
    if (this.showPassword)
      return 'visibility';
    return 'visibility_off';
  }

  get toggleRePasswordIcon(): string {
    if (this.showRePassword)
      return 'visibility';
    return 'visibility_off';
  }

  async onSignup(): Promise<void> {
    if (this.signupForm.valid) {
      const email: string = this.signupForm.get('email').value;
      const username: string = this.signupForm.get('username').value;
      const password: string = this.signupForm.get('password').value;
      const rePassword: string = this.signupForm.get('rePassword').value;
      const authResult = await this.authService.signUp(email, username, password, rePassword);
      this.signupResult = { message: authResult.message, state: authResult.result ? AlertState.success : AlertState.failure};
      if (this.signupResult.state === AlertState.failure) {
        this.signupForm.patchValue({
          password: '',
          rePassword: ''
        });
      } else {
        this.signupForm.reset();
      }
    }
  }

  private initSignupForm(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      rePassword: new FormControl('',[
        Validators.required
      ])
    }, {
      validators: [CustomValidators.passwordConfirming]
    });
  }
}
