import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private userService: UserService) { }

  logout(){
    this.userService.logOutUser()
  }

  ngOnInit(): void {
  }

  public get isUserLoggedIn(){
    return this.userService.isLoggedIn
  }

  public get isUserSalaryEligible(){
    return Number(localStorage.getItem('salary')) > 400
  }

}
