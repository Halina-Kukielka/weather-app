import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { HttpService } from "../http.service";
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Location, WeatherData } from '../models/weather-data.model';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-start',
    imports: [CommonModule, TranslateModule, FormsModule],
    templateUrl: './start.component.html',
    standalone: true,
    styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit {
    city: string = '';
    cities: Location[] = [];
    selectedCity: Location | null = null;
    errorMessage: string = '';
    weatherData: WeatherData | null = null;

    constructor(private router: Router, private httpService: HttpService) {}

    ngOnInit(): void {}

    onCityInput(event: any): void {
        this.city = event.target.value.trim();

        if (this.city.length > 2) {
            this.getCities(this.city);
        } else {
            this.cities = [];
            this.selectedCity = null;
            this.errorMessage = '';
        }
    }


    getCities(city: string): void {
        this.httpService.getCities(city).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            catchError(error => {
                console.error(error);
                this.errorMessage = "Error fetching cities";
                return of([] as Location[]);
            })
        ).subscribe((response: Location[]) => {
            this.cities = response;
            this.errorMessage = response.length === 0 ? "No location found" : '';
        });
    }

    onSelectCity(city: Location): void {
        this.selectedCity = city;
        this.city = `${city.name}, ${city.region}, ${city.country}`;
        this.cities = [];
        this.errorMessage = '';
    }



    getWeatherForCity(city: Location): void {
        this.httpService.getWeather(city.name, 'en').pipe(
            catchError(error => {
                console.error(error);
                this.errorMessage = "Error fetching weather";
                return of(null);
            })
        ).subscribe((response: WeatherData | null) => {
            if (response) {
                this.weatherData = response;
                this.errorMessage = '';
            } else {
                this.errorMessage = "Weather data not available";
            }
        });
    }


    searchWeather(): void {
        if (!this.selectedCity) {
            this.errorMessage = "Please choose a location from the list";
            return;
        }

        console.log("Redirecting to weather page for:", this.selectedCity);
        this.router.navigate(['weather',
            this.selectedCity.name,
            this.selectedCity.region,
            this.selectedCity.country]);
    }

}
