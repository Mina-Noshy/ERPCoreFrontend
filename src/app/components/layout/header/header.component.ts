import { Directionality } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { LocalStorageValues } from 'src/app/static-values/local-storage-values';
import { PermissionGroupListVM } from 'src/app/view-models/permission-group-list-vm';
import { PermissionListVM } from 'src/app/view-models/permission-list-vm';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  permissions:PermissionListVM[]=[];
  permissionGroups:PermissionGroupListVM[]=[];
  
  isAuthorize = false;
  username = '';

  appLang: string | null = "ar";
  appLangs: any[] = [
    { code: 'ar', name: 'Arabic' },
    { code: 'en', name: 'English' },
  ];

  constructor(private translate: TranslateService,
    private dir: Directionality,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService) {

    this.appLang = localStorage.getItem(LocalStorageValues.app_lang);

    //this.dir.change(this.appLang == "ar" ? 'rtl' : 'ltr');
    this.checkAuthorization()
  }

  
  translateLanguageTo(lang: string) {
    localStorage.setItem(LocalStorageValues.app_lang, lang);
    this.translate.use(lang);
    //this.dir.change(this.appLang == "ar" ? 'rtl' : 'ltr');
  }

  logout(): void {
    this.authService.logout().subscribe(x => {});
    this.checkAuthorization();
    this.router.navigate(['/login']);
  }

  private checkAuthorization(): void {
    let currUser = this.tokenService.getUserDetails();

    this.isAuthorize = currUser?.isAuthenticated?? false;

    this.username = currUser.firstName + ' ' + currUser.lastName;

    this.permissions = currUser?.permissions??[];

    // get distinct group names
    this.generatePermissionGroup();
  }


  private generatePermissionGroup():void{
    this.permissionGroups = this.permissions.reduce((accumulator: PermissionGroupListVM[], current: PermissionListVM) => {
      const existingGroup = accumulator.find((group) => 
        group.name === current.groupName &&
        group.icon === current.groupIcon &&
        group.text === current.groupText
      );
      
      if (!existingGroup) {
        accumulator.push({
          name: current.groupName,
          icon: current.groupIcon,
          text: current.groupText
        });
      }
      
      return accumulator;
    }, []);

  }
}
