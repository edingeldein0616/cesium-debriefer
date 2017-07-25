import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../home.service';

@Component({
    selector: 'app-flight-info',
    templateUrl: './flight-info.component.html'
})
export class FlightInfoComponent {

    constructor(private router: Router, private homeService: HomeService) {}

    onBack() {
        this.homeService.flightOpened.emit(false);
    }

    startFlight() {
        this.router.navigate(['flight-display']);
    }
}