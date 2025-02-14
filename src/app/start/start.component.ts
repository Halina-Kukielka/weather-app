import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-start',
  imports: [CommonModule, TranslateModule],
  templateUrl: './start.component.html',
  standalone: true,
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit{
  city: string = '';

  constructor(private  router: Router) {}


  ngOnInit(): void {}

  onCityInput(event: any): void {
    this.city = event.target.value;
  }

  searchWeather(){
    this.router.navigate(['weather/', this.city]);
  }

}
