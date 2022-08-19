import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import {EmployeesComponent} from "./employees.component";



@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeRoutingModule
  ],
  exports: [EmployeesComponent]
})
export class EmployeeModule { }
