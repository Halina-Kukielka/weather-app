import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../http.service';
import {ForecastDay, Hour, WeatherData} from '../models/weather-data.model';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-weather',
    imports: [CommonModule, TranslateModule],
    templateUrl: './weather.component.html',
    standalone: true,
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
    private scrollUnlistener!: () => void;
    showLeftArrow = false;
    showRightArrow = false;
    city: string = '';
    weatherData: WeatherData | null = null;
    todayDate: string = '';
    filteredForecast: ForecastDay[] = [];
    todayLabel: string = '';
    tomorrowLabel: string = ';'

    constructor(
        private route: ActivatedRoute,
        private httpService: HttpService,
        private renderer: Renderer2,
        private translate: TranslateService) {
    }


    ngOnInit(): void {
        this.city = this.route.snapshot.paramMap.get('city') || '';
        const region = this.route.snapshot.paramMap.get('region') || '';
        const country = this.route.snapshot.paramMap.get('country') || '';
        var browserLang = this.translate.getBrowserLang();
        if (!browserLang) browserLang = "en";

        this.httpService.getWeather(`${this.city},${region},${country}`, browserLang!).subscribe({
            next: (res) => {
                this.weatherData = res;
                this.todayDate = new Date().toISOString().split('T')[0];
                if (this.weatherData?.forecast?.forecastday) {
                    this.filteredForecast = this.weatherData.forecast.forecastday.slice(1, 7).map(day => ({
                        ...day,
                        day: {
                            ...day.day,
                            avgtemp_c: WeatherComponent.roundTemperature(day.day.avgtemp_c),
                            mintemp_c: WeatherComponent.roundTemperature(day.day.mintemp_c),
                            maxtemp_c: WeatherComponent.roundTemperature(day.day.maxtemp_c)
                        }
                    }));
                }
            },
            error: (err) => {
                console.error('Error while fetching weather data:', err);
            }
        });
        this.translate.get('weather.today').subscribe((translatedToday) => {
            this.todayLabel = translatedToday;
        });
        this.translate.get('weather.tomorrow').subscribe((translatedTomorrow) => {
            this.tomorrowLabel = translatedTomorrow;
        });
    }

    ngAfterViewInit() {
        if (this.scrollContainer) {
            this.scrollUnlistener = this.renderer.listen(this.scrollContainer.nativeElement, 'scroll', () => {
                this.checkScroll();
            });
            this.checkScroll();
        }
        this.showRightArrow = true;
    }


    scrollLeft(): void {
        this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }

    scrollRight(): void {
        this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }

    checkScroll(): void {
        const el = this.scrollContainer.nativeElement;
        this.showLeftArrow = el.scrollLeft > 0;
        this.showRightArrow = el.scrollLeft + el.clientWidth < el.scrollWidth;
    }

    private static roundTemperature(temp: number): number {
        return Math.round(temp);
    }

    getCurrentTemperature(): number | undefined {
        return this.weatherData?.current?.temp_c !== undefined
            ? Math.round(this.weatherData.current.temp_c)
            : undefined;
    }

    getFeelsLikeTemp(): number | undefined {
        return this.weatherData?.current.feelslike_c !== undefined
            ? Math.round(this.weatherData.current.feelslike_c) : undefined;
    }

    getDayOfWeekForToday(): string {
        const daysOfWeek = [
            this.translate.instant('days.sunday'),
            this.translate.instant('days.monday'),
            this.translate.instant('days.tuesday'),
            this.translate.instant('days.wednesday'),
            this.translate.instant('days.thursday'),
            this.translate.instant('days.friday'),
            this.translate.instant('days.saturday')
        ];

        const months = [
            this.translate.instant('months.january'),
            this.translate.instant('months.february'),
            this.translate.instant('months.march'),
            this.translate.instant('months.april'),
            this.translate.instant('months.may'),
            this.translate.instant('months.june'),
            this.translate.instant('months.july'),
            this.translate.instant('months.august'),
            this.translate.instant('months.september'),
            this.translate.instant('months.october'),
            this.translate.instant('months.november'),
            this.translate.instant('months.december')
        ];

        const today = new Date();
        const dayOfWeek = daysOfWeek[today.getDay()];
        const day = today.getDate();
        const month = months[today.getMonth()];
        const year = today.getFullYear();

        return `${dayOfWeek}, ${day} ${month} ${year}`;
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
            return this.todayLabel;
        } else if (diffDays === 1) {
            return this.tomorrowLabel;
        } else {
            return forecastDate.toLocaleDateString();
        }
    }

    getHourlyForecast(): Hour[] {
        if (!this.weatherData?.forecast?.forecastday?.length) {
            return [];
        }
        const now = new Date();
        const currentHour = now.getHours();
        const hourlyData = this.weatherData?.forecast.forecastday[0].hour || [];

        return hourlyData
            .filter(hour => {
                const hourTime = new Date(hour.time).getHours();
                return hourTime >= currentHour;
            })
            .map(hour => ({
                time: hour.time.split(" ")[1],
                temp_c: WeatherComponent.roundTemperature(hour.temp_c),
                condition: hour.condition,
                icon: hour.condition.icon
            }));
    }

    ngOnDestroy() {
        if (this.scrollUnlistener) {
            this.scrollUnlistener();
        }
    }
}
