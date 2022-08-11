import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { EmployeesForm } from "../../Interfaces/employees-form";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable({
  providedIn: 'root'
})
export class HTTPServiceService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public postRequest(employee: any): Observable<EmployeesForm> {
    return this.http.post<EmployeesForm>(`${this.baseUrl}/employees`, employee);
  }

  public showEmployees(): Observable<EmployeesForm[]>{
    return this.http.get<EmployeesForm[]>(`${this.baseUrl}/employees`);
  }

  public getIdData(id:number): Observable<EmployeesForm>{
    console.log("called")
    return this.http.get<EmployeesForm>(`${this.baseUrl}/employees/${id}`)
  }
  public updateEmployee(id: number, employee: object){
    console.log(9999999)
    return this.http.put(`${this.baseUrl}/employees/${id}`, employee);
  }
}
