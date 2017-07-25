import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../authentication/user.model';
import { Flight } from './flight.model';

import { HomeService } from '../home.service';

@Component({
    selector: 'app-flights',
    templateUrl: './flights.component.html',
    styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
    
    flights: Flight[] = [];
    @Output() flightSelected = new EventEmitter<boolean>();

    constructor(private homeService: HomeService) {}

    hideMargin() {
        if(localStorage.getItem('permission') !== 'ADMIN') {
            return true;
        }
        return false;        
    }

    onSelect(index: number) {
        this.flightSelected.emit(true);
        this.homeService.flightOpened.emit(true);
    }

    ngOnInit() {
        /* If a student is logging in, get the user's flights OR If there was a currently selected user, 
           render their flights on component creation */
        if(this.homeService.studentLoggedIn || this.homeService.selectedUser) {
            this.flights = this.homeService.getCurrentUserFlights();
        }

        if(!this.homeService.studentLoggedIn) {
            this.homeService.userSelected
                .subscribe(
                    (student: User) => {
                        if(!student) {
                            this.flights = [];
                            return;
                    }
                    this.flights = student.flights;
                }
            );
        }
    }
}