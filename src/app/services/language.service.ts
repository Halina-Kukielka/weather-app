import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    translate: TranslateService = inject(TranslateService);

    constructor() {
        this.setup();
    }

    setup() {
        const browserLanguage = navigator.language.split('-')[0];
        const supportedLanguages = ['en', 'de'];
        console.log('Detected browser language: ' + browserLanguage);

        if (supportedLanguages.includes(browserLanguage)) {
            this.setLanguage(browserLanguage);
        } else {
            this.setLanguage('en');
        }
    }

    setLanguage(language: string) {
        this.translate.use(language);
        localStorage.setItem('language', language);
        console.log("Language set to: " + language);
    }


    getSavedLanguage(): string {
        return localStorage.getItem('language') || 'en';
    }
}
