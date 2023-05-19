import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterFormVM } from 'src/app/view-models/register-form-vm';

@Component({
  selector: 'app-page-group-form',
  templateUrl: './page-group-form.component.html',
  styleUrls: ['./page-group-form.component.scss']
})
export class PageGroupFormComponent {

  credintils:RegisterFormVM = new RegisterFormVM();
  successProcess = false;
  loading = false;
  error = '';

  confirmPassword = '';

  register(){
    
  }

  constructor(public dialogRef: MatDialogRef<PageGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      
    }
}
