import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeCurrencyService {

  constructor(private http: HttpClient) {

  }
  public getRequest(FC: string, SC:string): Observable<any> {
    return this.http.get(`https://v6.exchangerate-api.com/v6/f9e8fe1d3394d66d7f0f8e96/pair/${FC}/${SC}`)

  }
}
