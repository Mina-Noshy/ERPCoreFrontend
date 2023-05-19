import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterFormVM } from 'src/app/view-models/register-form-vm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent 
{
  credintils:RegisterFormVM = new RegisterFormVM();
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
