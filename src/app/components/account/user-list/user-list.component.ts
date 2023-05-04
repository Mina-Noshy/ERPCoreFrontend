import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StringVM } from 'src/app/view-models/string-vm';
import { UserVM } from 'src/app/view-models/user-vm';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  implements OnInit 
{
  displayedColumns: string[] = ['fullName', 'userName', 'phoneNumber', 'email', 'isConfirmed'];
  dataSource = new MatTableDataSource<UserVM>();

  constructor(private accountService:AccountService, 
              private snackBarService:SnackBarService)
  {
    
  }
  ngOnInit():void
  {
    this.accountService.getAllUsers().subscribe(
      users => {
        this.dataSource.data = users;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  
  toggleConfirmeEmail(email: string, isConfirmed: boolean):void
  {
    
    let model:StringVM = new StringVM();
    model.value = email;

    this.accountService.toggleConfirmeEmail(model).subscribe(
      result => {
        if (result)
        {
          this.dataSource.data = this.dataSource.data.map(obj => {
            if (obj.email === email) {
              return { ...obj, isConfirmed: !isConfirmed };
            }
            return obj;
          });
        }
        result?  this.snackBarService.show('email', ' unconfirmed') : this.snackBarService.show('email',  ' confirmed');
      },
      error => {
        console.error('Error:', error);
      }
    );

  }

}
