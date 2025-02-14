import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageService} from "./services/language.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translate: TranslateService,
              public lService: LanguageService) {
    lService.setup();
    const browserLanguage = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'de'];
    console.log("browserLanguage " + browserLanguage);
    if (supportedLanguages.includes(browserLanguage)) {
      translate.use(browserLanguage);
    }
  }

  title = 'WeatherApp';
}
