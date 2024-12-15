import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit{
  city: string = '';

  constructor(private  router: Router) {
  }

  ngOnInit(): void {}

  onCityInput(event: any): void {
    this.city = event.target.value;
  }

  searchWeather(){
    this.router.navigate(['weather/', this.city]);
    console.log('szuka miasta');
  }

}
