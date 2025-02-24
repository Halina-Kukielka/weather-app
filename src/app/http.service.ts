import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Location, WeatherData} from './models/weather-data.model';
import {Observable} from 'rxjs';



@Injectable({providedIn: 'root'})
export class HttpService {

  private readonly apiKey = '320869ba8ca64062a7e103327241012';
  private readonly baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  constructor(private httpClient: HttpClient) {
  }

  public getWeather(city: string, lang: string): Observable<WeatherData> {
    let linkUrl = `${this.baseUrl}?key=${this.apiKey}&q=${city}&days=7&lang=${lang}`;
    return this.httpClient.get<WeatherData>(linkUrl);
  }


  public getCities(city: string): Observable<Location[]> {
    const searchUrl = `https://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${city}`;
    return this.httpClient.get<Location[]>(searchUrl);
  }

}
