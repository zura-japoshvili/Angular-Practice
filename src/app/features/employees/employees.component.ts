import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { EmployeesForm } from "../../core/Interfaces/employees-form";
import { EmployeesService } from "../../core/services/employees.service";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  constructor(private myService: EmployeesService, private http: HttpClient) { }

  public updateBool = false;
  private currentID = 0;
  public showMore = false;
  private moreIsActive = false;
  private pages = 3;

  public employeeForm  = new FormGroup(
    {name: new FormControl('', Validators.required),
      salary: new FormControl(0, Validators.required),
      age: new FormControl(0, Validators.required)}
  );

  employees: EmployeesForm[] = [];

  ngOnInit(): void {
    this.getEmployees();
  }
  public getEmployees(){
    this.myService.showEmployees().pipe(
      tap((data) =>  {

        if(data.length - 1 > this.pages &&  !this.moreIsActive){
          console.log(data.length, this.pages);
          this.showMore = true;
          this.employees = data.filter((value, index) => index <= this.pages);
        }else if(data.length > this.pages && this.moreIsActive){
          this.pages += 4;
          console.log(data.length, this.pages);
          if (data.length - 1 > this.pages ){
            this.showMore = true;
            this.employees = data.filter((value, index) => index <= this.pages);
          }else {
            console.log(3)
            this.showMore = false;
            this.pages = data.length - 1;
            this.employees = data.filter((value, index) => index <= this.pages);
          }
        }
        else{
          console.log(4)
          this.showMore = false;
          this.employees = data;
        }

      })
    ).subscribe()
  }

  public onRegister(){
    this.myService.postRequest(this.employeeForm.value).subscribe((value:EmployeesForm) => {
      this.employees.push(value);
    });

    this.getEmployees();
  }
  // type number causes Error : --> error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  //   Type 'undefined' is not assignable to type 'number'.
  public onEdit(id: any){
    this.myService.getIdData(id).pipe(
      tap((data) =>{
        //Update form without data.id -- id causes error
        // this.employeeForm.setValue(data);
        this.employeeForm.get('name')?.setValue(data.name);
        console.log(typeof data.salary)
        this.employeeForm.get('salary')?.setValue(data.salary);
        this.employeeForm.get('age')?.setValue(data.age);

        this.updateBool = true;
        this.currentID = id;
      })
    ).subscribe()
  }
  private returnIndex(): number{
    let index = 0;
    for (let i = 0; i < this.employees.length; i++){
      if (this.employees[i].id === this.currentID){
        index = i;
        break;
      }
    }
    console.log(index, this.currentID)
    return index;
  }
  public updateData(){
    console.log(123123)
    this.myService.updateEmployee(this.currentID, this.employeeForm.value).subscribe();
    // this.employees[this.returnIndex()] = this.employeeForm.value;

    this.updateBool = false;
  }
  public deleteEmp(id: any){
    this.currentID = id;
    this.myService.deleteEmployee(id).subscribe();
    this.employees.splice(this.returnIndex(), 1);

    this.updateBool = false;

    this.getEmployees()
  }
  public showMoreEmp(){
    this.moreIsActive = true;
    this.getEmployees();
  }
}
