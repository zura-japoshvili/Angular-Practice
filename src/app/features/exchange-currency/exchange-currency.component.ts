import { Component, OnInit } from '@angular/core';
import { ExchangeCurrencyService } from "../../core/services/exchange-currency.service";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-exchange-currency',
  templateUrl: './exchange-currency.component.html',
  styleUrls: ['./exchange-currency.component.scss']
})
export class ExchangeCurrencyComponent implements OnInit {

  public currencyForm = new FormGroup({});
  private currencyCodes = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'];
  private firstCurrencyBool = false;
  private secondCurrencyBool = false;
  private firstCur = 'null';
  private secondCur = 'null';

  constructor(private myService: ExchangeCurrencyService ) { }
  public getData(FC:string, SC:string, amount: number, pos:string) {
    return this.myService.getRequest(FC, SC).subscribe(value => {
      this.setData(value.conversion_rate, amount, pos);
    });
  }

  ngOnInit(): void {
    this.currencyForm = new FormGroup({
      first_c: new FormControl('', Validators.required),
      second_c: new FormControl('', Validators.required),
      firstAmount: new FormControl('',),
      secondAmount: new FormControl('',)
    });
    this.onChanges();
  }
  private setData(rate: number, amount: number, pos: string){
    if (pos === 'first'){
      this.currencyForm.get('secondAmount')?.setValue((rate * amount).toFixed(4), {emitEvent: false});

    }else if(pos === 'second'){
      this.currencyForm.get('firstAmount')?.setValue((rate * amount).toFixed(4), {emitEvent: false});
    }
  }

  public onChanges(){
    this.currencyForm.get('first_c')?.valueChanges.subscribe(val => {
      if(this.currencyCodes.includes(val.toUpperCase())){
        this.firstCurrencyBool = true;
        this.firstCur = val.toUpperCase();
        console.log(1)
      }else{
        this.firstCurrencyBool = false;
        this.secondCur = 'null';
      }
    })
    this.currencyForm.get('second_c')?.valueChanges.subscribe(val => {
      if(this.currencyCodes.includes(val.toUpperCase())){
        this.secondCurrencyBool = true;
        this.secondCur = val.toUpperCase();
        console.log(2)
      }else{
        this.secondCurrencyBool = false;
        this.secondCur = 'null';
      }
    });
    this.currencyForm.get('firstAmount')?.valueChanges.subscribe(val => {
      console.log(this.firstCurrencyBool, this.secondCurrencyBool)
      if (this.firstCurrencyBool && this.secondCurrencyBool && typeof val === "number"){
        console.log(3);
        this.getData(this.firstCur, this.secondCur, val, 'first');
      }
    });
    this.currencyForm.get('secondAmount')?.valueChanges.subscribe(val => {
      console.log(this.firstCurrencyBool, this.secondCurrencyBool)
      if (this.firstCurrencyBool && this.secondCurrencyBool && typeof val === "number"){
        console.log(3);
        this.getData(this.secondCur, this.firstCur, val, 'second');
      }
    });
  }


}
