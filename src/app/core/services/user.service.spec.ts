import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {userInfo} from "os";
import {EmployeesForm} from "../Interfaces/employees-form";


describe('UserService', () => {
  let service: UserService;
  let expectedEmps: EmployeesForm[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(UserService);
    expectedEmps = [{}] as EmployeesForm[];
  });

  it('#getAllUsers should be created', () => {
    service.getAllUsers().subscribe(emp => {
      expect(emp).toEqual(expectedEmps)
    })

  });
});
