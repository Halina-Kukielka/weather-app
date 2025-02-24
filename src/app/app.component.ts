import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageService} from "./services/language.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TranslateModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'WeatherApp';

    constructor(private translate: TranslateService, public lService: LanguageService) {
    }

    ngOnInit() {
        this.lService.setup();

        const browserLanguage = navigator.language.split('-')[0];
        const supportedLanguages = ['en', 'de'];


        if (supportedLanguages.includes(browserLanguage)) {
            this.translate.use(browserLanguage);
        } else {
            this.translate.use('en');
        }
    }

    ngAfterViewInit() {
        const video = document.querySelector("video");
        if (video) {
            video.play().catch(error => console.log("Autoplay verhindert:", error));
        }

    }

}
