import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageValues } from 'src/app/static-values/local-storage-values';
import { LoginFormVM } from 'src/app/view-models/login-form-vm';
import { UserDetailsVM } from 'src/app/view-models/user-details-vm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credintils: LoginFormVM = new LoginFormVM();
  loading = false;
  error = '';

  constructor(private authService: AuthService,
    private router: Router) {
  }

  login(): void {
    this.loading = true;
    this.error = '';

    this.authService.login(this.credintils).subscribe(
      userDetails => {
        if (userDetails?.isAuthenticated) {
          this.loading = false;
          this.error = userDetails?.message ?? '';
          this.router.navigate(['/dashboard']);
        } 
        else {
          this.loading = false;
          this.error = userDetails?.message ?? '';
        }
      },
      error => {
        this.loading = false;
        this.error = 'Something went wrong!';
        console.error('Error:', error);
      }
    );
  }

}
