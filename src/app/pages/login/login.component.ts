import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService:AuthService,
              private router:Router)
  {
  }

  login():void
  {
    this.authService.login();
    this.router.navigate(['/']);
  }

  logout():void
  {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
