import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeCurrencyComponent } from './exchange-currency.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('ExchangeCurrencyComponent', () => {
  let component: ExchangeCurrencyComponent;
  let fixture: ComponentFixture<ExchangeCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeCurrencyComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
