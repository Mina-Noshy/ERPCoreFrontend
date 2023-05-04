import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterVM } from 'src/app/view-models/register-vm';
import { UserDetailsVM } from 'src/app/view-models/user-details-vm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent 
{
  credintils:RegisterVM = new RegisterVM();
  successProcess = false;
  loading = false;
  error = '';

  confirmPassword = '';

  constructor(private authService:AuthService)
  {
  }

  register():void
  {
    this.loading = true;
    this.error = '';

    if(this.confirmPassword != this.credintils.password)
    {
        this.successProcess = false;
        this.loading = false;
        this.error = 'password and confirm password not matched!';
        return;
    }
   
    this.authService.register(this.credintils).subscribe(
      userDetails => {
        if (userDetails?.isAuthenticated) {
          this.successProcess = true;
          this.loading = false;
          this.error = userDetails?.message ?? '';
        } 
        else {
          this.successProcess = false;
          this.loading = false;
          this.error = userDetails?.message ?? '';
        }
      },
      error => {
        this.successProcess = false;
        this.loading = false;
        this.error = 'Something went wrong!';
        console.error('Error:', error);
      }
    );
  }
  
}
