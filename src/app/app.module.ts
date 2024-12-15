import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component';
import {StartComponent} from './start/start.component';
import {RouterModule} from '@angular/router';
import {WeatherComponent} from './weather/weather.component';
import {FormsModule} from '@angular/forms';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HttpService} from './http.service';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    WeatherComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideHttpClient(withInterceptorsFromDi()),
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
