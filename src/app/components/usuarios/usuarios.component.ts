import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validaciones } from 'src/app/validators/validaciones';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nameUser', 'email', 'password', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsersData() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.dataSource.data = res;
    });
  }

  viewUser(user: User): void {
    this.dialog.open(UserDetailComponent, {
      width: '300px',
      data: user
    });
  }

  editUser(user: User): void {
    const form: FormGroup = this.fb.group({
      nameUser: [user.nameUser, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      password: ['', [validaciones.optionalPasswordStrength]],
      imagen: [user.imagen, [Validators.pattern(/https?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/)]]
    });

    Swal.fire({
      title: 'Editar Usuario',
      html:
        `<input id="nameUser" class="swal2-input" placeholder="Nombre" value="${user.nameUser}">
         <input id="email" class="swal2-input" placeholder="Email" value="${user.email}">
         <input id="password" type="password" class="swal2-input" placeholder="Password">
         <input id="imagen" class="swal2-input" placeholder="Imagen URL" value="${user.imagen}">`,
      focusConfirm: false,
      preConfirm: () => {
        const nameUser = (document.getElementById('nameUser') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const imagen = (document.getElementById('imagen') as HTMLInputElement).value;
        
        if (!nameUser || !email || !imagen) {
          Swal.showValidationMessage('Por favor, llena todos los campos');
          return null;
        }

        const updatedUser: Partial<User> = {
          id: user.id,
          nameUser: nameUser,
          email: email,
          imagen: imagen
        };

        if (password) {
          updatedUser.password = password;
        }

        return updatedUser;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser = result.value;
        this.userService.updateUser(updatedUser as User).subscribe(() => {
          this.getUsersData();
          Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
        });
      }
    });
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((user: User) => user.id !== id);
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
}

interface User {
  id: number;
  nameUser: string;
  email: string;
  password?: string;
  imagen: string;
}
