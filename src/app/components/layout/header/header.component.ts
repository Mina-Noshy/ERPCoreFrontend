import { Directionality } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { LocalStorageValues } from 'src/app/static-values/local-storage-values';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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

  checkAuthorization(): void {
    this.isAuthorize = this.tokenService.isAuthorize();
    this.username = this.tokenService.getUserDetails()?.firstName ?? '';
  }

  translateLanguageTo(lang: string) {
    localStorage.setItem(LocalStorageValues.app_lang, lang);
    this.translate.use(lang);
    //this.dir.change(this.appLang == "ar" ? 'rtl' : 'ltr');
  }

  logout(): void {
    this.authService.logout();
    this.checkAuthorization();
    this.router.navigate(['/login']);
  }
}
