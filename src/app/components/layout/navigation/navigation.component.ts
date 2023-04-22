import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent 
{

  app_lang:string|null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
  constructor(public translate: TranslateService,
              private dir: Directionality,
              private breakpointObserver: BreakpointObserver)
  {
    translate.addLangs(['en', 'ar']);


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

  translateLanguageTo(lang: string) 
  {
    localStorage.setItem("app_lang", lang);
    this.translate.use(lang);

    //this.dir.change(this.app_lang == "ar" ? 'rtl' : 'ltr');
  }

}
