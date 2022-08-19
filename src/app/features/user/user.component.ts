import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { passwordValidator } from 'src/app/core/password-validator';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  public formGroup = new FormGroup({})
  itemInArr: any[] = []
  loggedUserID: string = '';

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.loggedUserID = <string>localStorage.getItem('id')
   }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9]+"), Validators.minLength(7)]),
      confirmPassword: new FormControl('', [Validators.required]),
      Nickname: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9-]+$')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\+?995(\\d{9})$'  ),]),
      salary: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required, Validators.pattern
        ('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$'
        ),]),
      checkbox: new FormControl('', Validators.required)

    }, { validators: passwordValidator })
    this.getUsers()
  }
  public getUsers() {
    this.userService.getAllUsers().pipe(
      tap((users: any) => {
        this.itemInArr = users;
      })
    ).subscribe();
  }

  public delete(id: number) {
    let z = confirm("Are you Sure?");
    if (z) {
      this.userService.deleteUser(id).pipe(
        tap(() => {
          this.userService.logOutUser()
        }),
        catchError(() => {
          alert('error trying to remove user')
          return of({})
        })
      ).subscribe()
    }
  }
  public updateForm(user: any): void {
    this.formGroup.get('email')?.setValue(user.email);
    this.formGroup.get('password')?.setValue(user.confirmPassword);
    this.formGroup.get('confirmPassword')?.setValue(user.confirmPassword);
    this.formGroup.get('Nickname')?.setValue(user.Nickname);
    this.formGroup.get('phoneNumber')?.setValue(user.phoneNumber);
    this.formGroup.get('salary')?.setValue(user.salary);
    this.formGroup.get('website')?.setValue(user.website);
  }
  public updateUser(): void {
    this.userService.updateUser(this.loggedUserID, this.formGroup.value).pipe(
      switchMap((user: any): any => {
        localStorage.setItem('salary', user.salary);
        this.formGroup.reset();
        this.getUsers()
      }),
    ).subscribe()
  }

}
