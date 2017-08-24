import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../../../home.service';
import { AuthService } from '../../../../authentication/auth.service';

@Component({
    selector: 'app-flight-info',
    templateUrl: './flight-info.component.html',
    styleUrls: ['./flight-info.component.css']
})
export class FlightInfoComponent {

    constructor(private router: Router, 
                private homeService: HomeService,
                private authService: AuthService) {}

    onBack() {
        this.router.navigate(['home', 'flights']);
        // this.homeService.flightOpened.emit(false);
    }

    startFlight() {
        this.authService.flightStarted.emit(true);
        this.router.navigate(['flight-display']);
    }
}