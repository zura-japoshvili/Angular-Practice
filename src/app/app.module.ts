import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ExchangeCurrencyComponent } from './exchange-currency/exchange-currency.component';
import {HttpClientModule} from "@angular/common/http";
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ExchangeCurrencyComponent,
    EmployeeRegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
