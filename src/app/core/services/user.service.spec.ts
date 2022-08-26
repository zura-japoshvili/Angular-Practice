import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {EmployeesForm} from "../Interfaces/employees-form";


describe('UserService', () => {
  let service: UserService;
  let expectedEms: EmployeesForm[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(UserService);
    // expectedEms = [{}] as EmployeesForm[];
  });

  it('#getAllUsers should be created', () => {
    service.getAllUsers().subscribe(emp => {
      expect(emp).toEqual(expectedEms)
    })

  });
});
