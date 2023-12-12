import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormErrorService } from 'src/app/services/form-error-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;

  form!: FormGroup;

  constructor(
    public formErrorService: FormErrorService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async login() {
    if (this.form.invalid) return;

    const { password, email } = this.form.value;
    
    const { token, ...user } = await this.authService.login({ password, email });

    this.storageService.setUser(user);
    this.storageService.setToken(token!);
    this.router.navigateByUrl('/my-posts');
  }
}
