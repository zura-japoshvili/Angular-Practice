import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { EmployeesForm } from "../../Interfaces/employees-form";
import {HTTPServiceService} from "./http-service.service";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {log} from "util";

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  constructor(private myService: HTTPServiceService, private http: HttpClient) { }

  public updateBool = false;
  private currentID = 0;

  public employeeForm  = new FormGroup(
    {name: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)}
  );

  employees: EmployeesForm[] = [];

  ngOnInit(): void {
    this.getEmployees();
  }
  public getEmployees(){
    this.myService.showEmployees().pipe(
      tap((data) =>  {
        this.employees = data;
      })
    ).subscribe()
  }

  public onRegister(){
    this.myService.postRequest(this.employeeForm.value).subscribe((value:EmployeesForm) => {
      this.employees.push(value);
    });
  }
  // type number causes Error : --> error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  //   Type 'undefined' is not assignable to type 'number'.
  public onEdit(id: any){
    console.log(typeof id)
    this.myService.getIdData(id).pipe(
      tap((data) =>{
        //Update form without data.id -- id causes error
        // this.employeeForm.setValue(data);
        this.employeeForm.get('name')?.setValue(data.name);
        this.employeeForm.get('salary')?.setValue(data.salary);
        this.employeeForm.get('age')?.setValue(data.age);

        this.updateBool = true;
        this.currentID = id;
      })
    ).subscribe()
  }
  public updateData(){
    console.log(123123)
    this.myService.updateEmployee(this.currentID, this.employeeForm.value).subscribe();
    let index = 0;
    for (let i = 0; i < this.employees.length; i++){
      if (this.employees[i].id === this.currentID){
        index = i;
        break;
      }
    }
    this.employees[index] = this.employeeForm.value;

    console.log(index, this.currentID)

    this.updateBool = false;
    this.currentID = 0;
  }
}
