import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DeleteConfirmationDialogComponent } from '../components/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private btnOK: string = '';

  constructor(private snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog) {

    let translationKeys = ['common.ok'];
    this.translate.get(translationKeys)
      .subscribe(
        trans => {
          this.btnOK = trans['common.ok'];
        }
      );
  }

  showSuccessAlert(msg: string) {
    this.snackBar.open(msg, this.btnOK,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }

  showErrorAlert(msg: string) {
    this.snackBar.open(msg, this.btnOK,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }

  showWarningAlert(msg: string) {
    this.snackBar.open(msg, this.btnOK,
      {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 10 * 1000
      });
  }

  async showDeleteConfirmationDialog():Promise<boolean>
  {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: 'you can pass any message here as retrive it in the component like {{ data }}'
    });
  
    const result = await dialogRef.afterClosed().toPromise();
    return result === true;
  }


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


}
