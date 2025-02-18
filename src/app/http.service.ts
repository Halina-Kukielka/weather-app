import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from './models/weather-data.model';
import { Observable } from 'rxjs';
import {LanguageService} from "./services/language.service";


@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly apiKey = '320869ba8ca64062a7e103327241012';
  private readonly baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  constructor(
      private httpClient: HttpClient,
      private languageService: LanguageService
  ) {}

  public getWeather(city: string, lang: string = this.languageService.getSavedLanguage()): Observable<WeatherData> {
    let linkUrl = `${this.baseUrl}?key=${this.apiKey}&q=${city}&days=7&lang=${lang}`;
    console.log('Requesting weather data with language:', lang);
    return this.httpClient.get<WeatherData>(linkUrl);
  }
}
