import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormErrorService } from 'src/app/services/form-error-service.service';
import { StorageService } from 'src/app/services/storage.service';
import { formPassword } from 'src/app/validators/form-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  hide1 = true;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public formErrorService: FormErrorService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
      fullName: ['', [Validators.required]],
    }, {validator: formPassword});
  }

    // this.form = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  //   confirmPassword: new FormControl(''),
  //   fullName: new FormControl('', [Validators.required]),
  // }, {validators: [formPassword]});

  async send() {
    if (this.form.invalid) return;

    const { fullName, password, email } = this.form.value;
    
    const { token, ...user } = await this.authService.register({ fullName, password, email });

    this.storageService.setUser(user);
    this.storageService.setToken(token!);
    this.router.navigateByUrl('/my-posts');

  }

}
