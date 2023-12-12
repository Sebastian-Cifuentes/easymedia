import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  private errorMap: { [key: string]: (c: FormControl | AbstractControl, name: string) => string } = {
    "required": (c: FormControl | AbstractControl, name: string) => `${name} is required`,
    "email": (c: FormControl | AbstractControl, name: string) => `${c.value} isn't a valid email`,
    "minlength": (c: FormControl | AbstractControl, name: string) => `${name} must be ${c.errors!['minlength'].requiredLength} characters or more`,
    "passwordMissmatch": (c: FormControl | AbstractControl, name: string) => `Passwords doesn't match`,
  }

  public mapErrors(control: FormControl | AbstractControl, name: string): string[] {
    try {
      return Object.keys(control.errors || {})
        .map(key => this.errorMap[key](control, name));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  errorControl(control: FormControl | AbstractControl): Boolean {
    return control?.invalid && (control?.dirty || control?.touched)
  }

}
