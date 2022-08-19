import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { passwordValidator } from '../../core/password-validator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup = new FormGroup({})
  private userDataIndex: number = 0;

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9]+"), Validators.minLength(7)])
  })

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9]+"), Validators.minLength(7)]),
      confirmPassword: new FormControl('', [Validators.required]),
      Nickname: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9-]+$')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\+?995(\\d{9})$'),]),
      salary: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required, Validators.pattern
        ('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$'
        ),]),
      checkbox: new FormControl('', Validators.required)

    }, { validators: passwordValidator })
  }

  login() {
    this.userService.loginUser(this.loginForm.value).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.accessToken)
        localStorage.setItem('id', response.user.id)
        localStorage.setItem('salary', response.user.salary)
        this.userService.isLoggedIn.next(true)
        this.router.navigateByUrl('/users').then()
      }),
      catchError(() => {
        alert('error while u trying to log in')
        return of({})
      })
    ).subscribe();
  }

  register() {
    this.userService.registerUser(this.formGroup.value).pipe(
      tap(() => {
        alert('User succesfully registered')
        this.formGroup.reset()
      }),
      catchError(() => {
        alert('Error while registering')
        return of({})
      })
    ).subscribe()
  }

}
