import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Directionality } from '@angular/cdk/bidi';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit
{
  is_authorize = false;
  user_name = '';

  app_lang:string|null = "ar";
  app_langs: any[] = [
    { code: 'ar', name: 'Arabic' },
    { code: 'en', name: 'English' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
  constructor(public translate: TranslateService,
              private dir: Directionality,
              private router: Router,
              private authService: AuthService,
              private breakpointObserver: BreakpointObserver)
  {
    
    translate.addLangs(this.app_langs.map(item => item.code));

    this.app_lang = localStorage.getItem("app_lang");
    if (this.app_lang == null) 
    {
      this.app_lang = "ar";
      translate.setDefaultLang(this.app_lang);
    }
    else
    {
      translate.setDefaultLang(this.app_lang);
    }
    //this.dir.change(this.app_lang == "ar" ? 'rtl' : 'ltr');
  } 
  
  ngOnInit(): void 
  {
    this.is_authorize = this.authService.isAuthorize();
    this.user_name = this.authService.getUsername();
  }

  translateLanguageTo(lang: string) 
  {
    localStorage.setItem("app_lang", lang);
    this.translate.use(lang);
    //this.dir.change(this.app_lang == "ar" ? 'rtl' : 'ltr');
  }

  logout():void
  {
    this.authService.logout();
    this.ngOnInit();
  }
}
