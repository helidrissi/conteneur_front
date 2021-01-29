import { Component } from '@angular/core';
import { TranslateService, DEFAULT_LANGUAGE } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conteneur-front';

  constructor(public translateParent: TranslateService){
    var lang = window.localStorage.getItem('lang');
    translateParent.setDefaultLang(lang);
  }

}
