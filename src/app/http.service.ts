import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WeatherData} from './models/weather-data.model';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class HttpService {

  private readonly apiKey = 'yourapikey';
  private readonly baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  constructor(private httpClient: HttpClient) {
  }

  public getWeather(city: string): Observable<WeatherData> {
    let linkUrl = `${this.baseUrl}?key=${this.apiKey}&q=${city}&days=7`;
    console.log("!!!"+linkUrl);
    return this.httpClient.get<WeatherData>(`${this.baseUrl}?key=${this.apiKey}&q=${city}&days=7`);
  }


}
