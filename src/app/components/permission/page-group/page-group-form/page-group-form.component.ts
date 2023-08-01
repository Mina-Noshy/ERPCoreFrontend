import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { PermissionService } from 'src/app/services/permission.service';
import { PageGroupFormVM } from 'src/app/view-models/page-group-form-vm';

@Component({
  selector: 'app-page-group-form',
  templateUrl: './page-group-form.component.html',
  styleUrls: ['./page-group-form.component.scss']
})
export class PageGroupFormComponent {

  model: PageGroupFormVM = new PageGroupFormVM();

  loading = false;

  constructor(public dialogRef: MatDialogRef<PageGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permissionService:PermissionService,
    private dialogService: DialogService) {

  }

  save(): void {
    this.loading = true;

    if (this.model?.id == null)
    {
      this.permissionService.insertPageGroup(this.model).subscribe(
        res => {
          this.loading = false;
          this.model = new PageGroupFormVM();
          this.dialogService.showInsertedSuccessAlert();
        },
        error => {
          this.loading = false;
          console.error('Error:', error);
          this.dialogService.showInsertFailedAlert();
        }
      );
    }
    else
    {
      this.permissionService.updatePageGroup(this.model).subscribe(
        res => {
          this.loading = false;
          this.model = new PageGroupFormVM();
          this.dialogService.showInsertedSuccessAlert();
        },
        error => {
          this.loading = false;
          console.error('Error:', error);
          this.dialogService.showInsertFailedAlert();
        }
      );
    }
    
  }

}
