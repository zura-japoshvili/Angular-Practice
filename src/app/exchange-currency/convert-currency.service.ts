import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ConvertCurrencyService {
  constructor(private  http: HttpClient) { }


  public getRequest(fc: string, sc:string): Observable<any>
  {
    return this.http.get(`https://v6.exchangerate-api.com/v6/ffb850de41afbd0831f29e53/pair/${fc}/${sc}`);
  }

}
