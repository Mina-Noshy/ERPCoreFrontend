import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DeleteConfirmationDialogComponent } from '../components/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private msgOk: string = '';
  private msgInsertedSuccess: string = '';
  private msgUpdatedSuccess: string = '';
  private msgDeletedSuccess: string = '';

  private msgInsertFailed: string = '';
  private msgUpdateFailed: string = '';
  private msgDeleteFailed: string = '';

  constructor(private snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog) {

    let translationKeys = [
      'common.ok',

      'msg.msg_inserted_success',
      'msg.msg_updated_success',
      'msg.msg_deleted_success',

      'msg.msg_insert_failed',
      'msg.msg_update_failed',
      'msg.msg_delete_failed',
    ];

    this.translate.get(translationKeys)
      .subscribe(
        trans => {
          this.msgOk = trans['common.ok'];
          
          this.msgInsertedSuccess = trans['msg.msg_inserted_success'];
          this.msgUpdatedSuccess = trans['msg.msg_updated_success'];
          this.msgDeletedSuccess = trans['msg.msg_deleted_success'];
          
          this.msgInsertFailed = trans['msg.msg_insert_failed'];
          this.msgUpdateFailed = trans['msg.msg_update_failed'];
          this.msgDeleteFailed = trans['msg.msg_delete_failed'];
        }
      );
  }


/* collection of success alert
************************************************************
*/
  showInsertedSuccessAlert() {
    this.snackBar.open(this.msgInsertedSuccess, this.msgOk,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }
  showUpdatedSuccessAlert() {
    this.snackBar.open(this.msgUpdatedSuccess, this.msgOk,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }
  showDeletedSuccessAlert() {
    this.snackBar.open(this.msgDeletedSuccess, this.msgOk,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }
/*
************************************************************
*/








/* collection of failed alert
************************************************************
*/
showInsertFailedAlert() {
  this.snackBar.open(this.msgInsertFailed, this.msgOk,
    {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 10 * 1000
    });
}
showUpdateFailedAlert() {
  this.snackBar.open(this.msgUpdateFailed, this.msgOk,
    {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 10 * 1000
    });
}
showDeleteFailedAlert() {
  this.snackBar.open(this.msgDeleteFailed, this.msgOk,
    {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 10 * 1000
    });
}
/*
************************************************************
*/








/* collection of shared alert
************************************************************
*/
  showSuccessAlert(msg: string) {
    this.snackBar.open(msg, this.msgOk,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }

  showErrorAlert(msg: string) {
    this.snackBar.open(msg, this.msgOk,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }

  showWarningAlert(msg: string) {
    this.snackBar.open(msg, this.msgOk,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }
  /*
  ************************************************************
  */




  /* collection of shared confirmation alert
  ************************************************************
  */
  async showDeleteConfirmationDialog():Promise<boolean>
  {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: 'you can pass any message here as retrive it in the component like {{ data }}'
    });
  
    const result = await dialogRef.afterClosed().toPromise();
    return result === true;
  }

  /*
  ************************************************************
  */




  /* show any component as a dialog
  ************************************************************
  */
  async showFormDialog(component: any, data: any = 0, width:string = '400px', height:string = '50vh'):Promise<boolean>
  {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.position = { top: '100px' }

    const dialogRef = this.dialog.open(component, {
      width: width,
      height: height,
      position: matDialogConfig.position,
      data: data,
      
      //panelClass: 'dialog-bg-color',
      //backdropClass: 'dialog-bg-color',
      
    });
  
    const result = await dialogRef.afterClosed().toPromise();
    return result === true;
  }
  /* show any component as a dialog
  ************************************************************
  */


}
