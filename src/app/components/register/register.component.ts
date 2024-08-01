import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { validaciones } from '../../validators/validaciones';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nameUser: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '', 
        [
          Validators.required,
          Validators.minLength(8),
          validaciones.passwordStrength
        ]
      ],
      imagen: ['', [Validators.pattern(/https?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { nameUser, email, password, imagen } = this.registerForm.value;

      this.registerService.register(nameUser, email, password, imagen).subscribe(
        response => {
          console.log('Registration successful', response);
          swal.fire({
            title: "Registro de Usuario",
            text: "Exitoso",
            icon: "success"
          });
          this.router.navigate(['/usuarios']);
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Error en el registro: ' + (error.error.message || 'Por favor, verifica los datos ingresados.');
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
