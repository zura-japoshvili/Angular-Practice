import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './pass-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerFormGroup = new FormGroup({});

  public updateBtn:boolean = false;
  public userData:any = [];
  private userDataIndex:number = 0;
  constructor() { }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPass: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(7), Validators.required]),
      nickname: new FormControl('', [Validators.pattern(/[A-Za-z0-9-]+$/), Validators.required]),
      phoneNumber: new FormControl('', [Validators.pattern(/\+995[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/), Validators.required]),
      website: new FormControl('', [Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/), Validators.required]),
      agree: new FormControl('', Validators.required)

    }, {validators: passwordValidator});
  }

  public register(): void{
    this.userData.push(this.registerFormGroup.value);
  }
  public deleteData(index: number): void {
    let z = confirm("Are u sure ?");
    if(z){
      this.userData.splice(index, 1);
    }

  }
  public updateForm(index: number): void{
      this.registerFormGroup.get('email')?.setValue(this.userData[index].email);
      this.registerFormGroup.get('password')?.setValue(this.userData[index].password);
      this.registerFormGroup.get('confirmPass')?.setValue(this.userData[index].confirmPass);
      this.registerFormGroup.get('nickname')?.setValue(this.userData[index].nickname);
      this.registerFormGroup.get('phoneNumber')?.setValue(this.userData[index].phoneNumber);
      this.registerFormGroup.get('website')?.setValue(this.userData[index].website);

      this.userDataIndex = index;
      this.updateBtn = true;
  }
  public updateData(): void{
    this.userData[this.userDataIndex] = this.registerFormGroup.value;
    this.updateBtn = false;
  }
}
