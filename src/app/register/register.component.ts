import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup = new FormGroup({});
  userData = new FormArray([]);

  constructor() { }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPass: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(7), Validators.required]),
      nickname: new FormControl('', [Validators.pattern(/^[A-Za-z][A-Za-z0-9]*$/), Validators.required]),
      phoneNumber: new FormControl('', [Validators.pattern(/[+995][d{9}]/), Validators.required]),
      website: new FormControl('', [Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/), Validators.required]),
      agree: new FormControl('', Validators.required)

    });
  }

  public onClick(): void{
    console.log(this.registerFormGroup.get('email')?.valid);
    console.log(this.registerFormGroup.get('password')?.valid);
    console.log(this.registerFormGroup.get('confirmPass')?.valid);
    console.log(this.registerFormGroup.get('nickname')?.valid);
    console.log(this.registerFormGroup.get('phoneNumber')?.valid);
    console.log(this.registerFormGroup.get('website')?.valid);
    console.log(this.registerFormGroup.get('agree')?.valid);
    
    this.userData.push(this.registerFormGroup.value);
    
    console.log(this.userData);
    
  }
}
