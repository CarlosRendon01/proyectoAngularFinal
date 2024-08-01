import { AbstractControl, ValidationErrors } from '@angular/forms';

export class validaciones {
  static passwordStrength(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  static optionalPasswordStrength(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // No error if password is not provided
    }

    return validaciones.passwordStrength(control);
  }
}
