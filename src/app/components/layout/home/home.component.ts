import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { PageGroupFormComponent } from '../../permission/page-group/page-group-form/page-group-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

constructor(private dialogService: DialogService){}

  async showPageGroupForm()
  {
    const confirmDelete = await this.dialogService.showFormDialog(PageGroupFormComponent, 0, '60vh', '500px');
    if(!confirmDelete) return;
  }
}
