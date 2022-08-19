import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesForm } from "../Interfaces/employees-form";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  public baseUrl = "http://localhost:3000";
  pageLimit = 4;

  constructor(private http: HttpClient) { }

  public postRequest(employee: any): Observable<EmployeesForm> {
    return this.http.post<EmployeesForm>(`${this.baseUrl}/employees`, employee)
  }
  public showEmployees(): Observable<EmployeesForm[]> {
    return this.http.get<EmployeesForm[]>(`${this.baseUrl}/employees?_limit=${this.pageLimit}`)
  }
  public getIdData(id?: number): Observable<EmployeesForm> {
    return this.http.get<EmployeesForm>(`${this.baseUrl}/employees/${id}`)
  }
  public updateEmployee(id: number | undefined, employee: any): Observable<EmployeesForm> {
   return  this.http.put<EmployeesForm>(`${this.baseUrl}/employees/${id}`, employee)
  }
  public deleteEmployee(id: any)  {
    return this.http.delete(`${this.baseUrl}/employees/${id}`)
  }



}
