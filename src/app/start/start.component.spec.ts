import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {StartComponent} from "./start.component";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

describe('AppComponent', () => {
    let fixture: ComponentFixture<StartComponent>;
    let component: StartComponent;
    let router: Router;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StartComponent],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create the start component', () => {

        expect(component).toBeTruthy();
    });

    it('should have a disabled button when city input is empty', () => {
        const button = fixture.debugElement.query(By.css('.btn')).nativeElement;
        expect(button.disabled).toBeTruthy();
    });

    it('should enable the button when city input has a value', () => {
        component.city = 'Berlin';
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('.btn')).nativeElement;
        expect(button.disabled).toBeFalsy();
    });


});
