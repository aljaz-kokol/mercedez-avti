import {AbstractControl} from '@angular/forms';

export class CustomValidators {
  // Makes sure that password and re-password and the same
  public static passwordConfirming(fg: AbstractControl): {[p: string]: boolean } {
    if (fg.get('password').value !== fg.get('rePassword').value) {
      return { 'passwordsDoNotMatch': true };
    }
    return null;
  }
}
