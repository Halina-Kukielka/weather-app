import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../http.service';
import {WeatherData} from '../models/weather-data.model';
import {CommonModule, NgFor} from '@angular/common';
@Component({
  selector: 'app-weather',
  imports: [NgFor],
  templateUrl: './weather.component.html',
  standalone: true,
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city: string = '';
  weatherData: WeatherData | null = null;
  todayDate: string = '';
  filteredForecast: any[] = [];


  constructor(private route: ActivatedRoute, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city') || '';

    this.httpService.getWeather(this.city).subscribe({
      next: (res) => {
        this.weatherData = res;

        console.log('Pobrane dane pogodowe:', JSON.stringify(res));
        console.log('Forecast data:', this.weatherData?.forecast?.forecastday);

        this.todayDate = new Date().toISOString().split('T')[0];
        if (this.weatherData?.forecast?.forecastday) {
          this.filteredForecast = this.weatherData.forecast.forecastday.filter(day => day.date !== this.todayDate);
        }
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych pogodowych:', err);
      }
    });
  }

  getDayOfWeekForToday(): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return daysOfWeek[today.getDay()];
  }

  getDayLabel(date: string): string {
    const localtime = this.weatherData?.location.localtime;
    if (!localtime) {
      return 'Invalid localtime';
    }
    const today = new Date(localtime.split(' ')[0] || '');
    const forecastDate = new Date(date);

    if (isNaN(forecastDate.getTime())) {
      return 'Invalid date';
    }

    const diffTime = forecastDate.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays === 2) {
      return 'Day After Tomorrow';
    } else {
      return forecastDate.toLocaleDateString();
    }
  }

  getPrecipitation(): string {
    return this.weatherData?.current?.precip_mm
      ? this.weatherData.current.precip_mm + ' mm'
      : '0 mm';
  }


}
