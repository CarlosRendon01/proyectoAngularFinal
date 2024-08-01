import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.baseUrl}/carros`);
  }

  deleteCar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/carros/${id}`);
  }

  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${this.baseUrl}/carros/${car.id}`, car);
  }

  addCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.baseUrl}/carros`, car);
  }
}

export interface Car {
  id: number;
  modelo: string;
  agencia: string;
  color: string;
  precio: number;
  imagen: string;
  descripcion: string;
}
