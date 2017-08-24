import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../authentication/user.model';
import { Flight } from './flight.model';

import { HomeService } from '../../home.service';

@Component({
    selector: 'app-flights',
    templateUrl: './flights.component.html',
    styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
    
    flights: Flight[];
    noFlights: boolean;
    @Output() flightSelected = new EventEmitter<boolean>();

    constructor(private homeService: HomeService, private router: Router) {}

    hideMargin() {
        if(localStorage.getItem('permission') !== 'ADMIN') {
            return true;
        }
        return false;        
    }

    onBack() {
        this.router.navigate(['home', 'students']);
    }

    onSelect(index: number) {
        this.router.navigate(['home', 'info']);
        this.flightSelected.emit(true);
    }

    getPermission() {
        if(localStorage.getItem('permission') === 'STUDENT')
            return false;
        return true;
    }

    ngOnInit() {
        /* If a student is logging in, get the user's flights OR If there was a currently selected user, 
           render their flights on component creation */
        this.flights = this.homeService.getCurrentUserFlights();
        if(this.homeService.studentLoggedIn || this.homeService.selectedUser) {
            this.flights = this.homeService.getCurrentUserFlights();
        }

        //Get flights for current user
        this.flights = this.homeService.getCurrentUserFlights();

        //Check if there are any flights
        if(this.flights.length == 0) {
            this.noFlights = true;
        } else {
            this.noFlights = false;
        }
    }
}