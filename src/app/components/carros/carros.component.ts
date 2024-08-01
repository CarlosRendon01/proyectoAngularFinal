import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DataService, Car } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { EditarCarroComponent } from '../editar-carro/editar-carro.component';
import { CrearCarroComponent } from '../crear-carro/crear-carro.component';
import { CarroDetailComponent } from '../carro-detail/carro-detail.component';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'modelo', 'agencia', 'color', 'acciones'];
  dataSource: MatTableDataSource<Car> = new MatTableDataSource<Car>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCarrosData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCarrosData() {
    this.dataService.getData().subscribe((res: Car[]) => {
      this.dataSource.data = res;
    });
  }

  verCarro(car: Car): void {
    this.dialog.open(CarroDetailComponent, {
      width: '400px',
      data: car
    });
  }

  editarCarro(car: Car): void {
    const dialogRef = this.dialog.open(EditarCarroComponent, {
      width: '400px',
      data: car
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateCar(result).subscribe(() => {
          this.getCarrosData();
        });
      }
    });
  }

  agregarCarro(): void {
    const dialogRef = this.dialog.open(CrearCarroComponent, {
      width: '400px',
      data: { id: null, modelo: '', agencia: '', color: '', precio: 0, imagen: '', descripcion: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.addCar(result).subscribe(newCar => {
          this.dataSource.data = [...this.dataSource.data, newCar];
        });
      }
    });
  }

  eliminarCarro(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteCar(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(car => car.id !== id);
          Swal.fire(
            'Eliminado!',
            'El carro ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
}
