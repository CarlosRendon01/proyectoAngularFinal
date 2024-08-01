import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(0)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      console.log('Email:', email); 
      console.log('Password:', password); 

      this.authService.login(email, password).subscribe(
        (response: User | null) => {
          if (response) {
            swal.fire({
              title: "Inicio de sesión",
              text: "Exitoso",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/dashboard']);
          } else {
            swal.fire({
              title: "Inicio de sesión",
              text: "Fallido",
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
