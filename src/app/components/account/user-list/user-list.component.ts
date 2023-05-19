import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account.service';
import { DialogService } from 'src/app/services/dialog.service';
import { StringVM } from 'src/app/view-models/string-vm';
import { UserListVM } from 'src/app/view-models/user-list-vm';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  
  displayedColumns: string[] = ['fullName', 'userName', 'phoneNumber', 'email', 'isConfirmed', 'id'];
  dataSource = new MatTableDataSource<UserListVM>();

  msgConfirmed='';
  msgUnConfirmed='';
  msgDeletedSuccess='';
  msgDeletingFailed='';
  msgUnknownError='';

  constructor(private accountService: AccountService,
    private dialogService: DialogService,
    private translate: TranslateService) {

      let translationKeys = [
        'msg.msg_account_confirmed',
        'msg.msg_account_unconfirmed',
        'msg.msg_deleted_success',
        'msg.msg_delete_failed',
        'msg.msg_unknown_error',
      ];
  
      this.translate.get(translationKeys)
        .subscribe(
          trans => {
            this.msgConfirmed = trans['msg.msg_account_confirmed'];
            this.msgUnConfirmed = trans['msg.msg_account_unconfirmed'];
            this.msgDeletedSuccess = trans['msg.msg_deleted_success'];
            this.msgDeletingFailed = trans['msg.msg_delete_failed'];
            this.msgUnknownError = trans['msg.msg_unknown_error'];
          }
        );

  }



  ngOnInit(): void {
    this.accountService.getAllUsers().subscribe(
      users => {
        this.dataSource.data = users;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }


  async deleteUser(userId: string): Promise<void> {

    const confirmDelete = await this.dialogService.showDeleteConfirmationDialog();
    if(!confirmDelete) return;
    
    let model: StringVM = new StringVM();
    model.value = userId;

    this.accountService.deleteUser(model).subscribe(
      result => {
            this.dialogService.showSuccessAlert(this.msgDeletedSuccess);
            this.ngOnInit();
      },
      error => {
        console.error('Error:', error);
        this.dialogService.showErrorAlert(this.msgDeletedSuccess);
      }
    );

  }

  toggleConfirmeEmail(email: string, isConfirmed: boolean): void {

    let model: StringVM = new StringVM();
    model.value = email;

    this.accountService.toggleConfirmeEmail(model).subscribe(
      result => {
        
        if (result) {
          if (isConfirmed) {
            this.dialogService.showSuccessAlert(this.msgUnConfirmed);
          }
          else {
            this.dialogService.showSuccessAlert(this.msgConfirmed);
          }

          if (result) {
            this.dataSource.data = this.dataSource.data.map(obj => {
              if (obj.email === email) {
                return { ...obj, isConfirmed: !isConfirmed };
              }
              return obj;
            });
          }
          
        }

      },
      error => {
        console.error('Error:', error);
        this.dialogService.showErrorAlert(this.msgUnknownError);
      }
    );

  }

}
