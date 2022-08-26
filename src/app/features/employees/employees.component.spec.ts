import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import {HttpClientModule} from "@angular/common/http";

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ', function () {
    expect(component['moreIsActive']).toEqual(false);
    component.showMoreEmp();
    expect(component['moreIsActive']).toEqual(true);
  });
  it('should ', function () {
    expect(component['currentID']).toEqual(0);
    expect(component.deleteEmp(arguments))
  });

});
