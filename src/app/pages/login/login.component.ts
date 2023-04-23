import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageValues } from 'src/app/static-values/local-storage-values';
import { LoginVM } from 'src/app/view-models/login-vm';
import { UserDetailsVM } from 'src/app/view-models/user-details-vm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent 
{
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService:AuthService,
              private router:Router)
  {
  }

  login():void
  {
    this.loading = true;
    this.error = '';
   
    let credintils:LoginVM = 
    {
      username: this.email,
      password: this.password
    }

    this.authService.login(credintils)
    .pipe(
      catchError(error => {
        let body = error.error as UserDetailsVM;
        this.loading = false;
        this.error = body?.message?? '';
        return '';
      })
    )
    .subscribe((response: UserDetailsVM) => 
    {
      if(response?.isAuthenticated)
      {
        this.router.navigate(['/']);
        localStorage.setItem(LocalStorageValues.user_details, JSON.stringify(response))
      }
      else
      {
        this.loading = false;
        this.error = response?.message?? '';
      }
    });

  }

  logout():void
  {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
