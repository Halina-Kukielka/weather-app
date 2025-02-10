import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'WeatherApp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('WeatherApp');
  });

  it(`should have video tag`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const videoElement = fixture.debugElement.query(By.css('video'));
    expect(videoElement).toBeTruthy();
  });


});
