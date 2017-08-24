import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

import { User } from '../authentication/user.model';
import { Flight } from './students/flights/flight.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [HomeService]
})
export class HomeComponent implements OnInit {

    constructor(private homeService: HomeService, private router: Router) {}

    private permission: string;
    selectedUser: User;
    displayFlight: boolean = true;
    flightSelected: boolean = false;
    studentLoggedIn;

    flights: Flight[] = [];

    ngOnInit() {
        this.homeService.initCurrentUser();

        this.permission = localStorage.getItem('permission');
        if(this.permission !== 'STUDENT') {
            this.homeService.studentLoggedIn = false;
            this.studentLoggedIn = false;
            this.router.navigate(['home', 'students']);
        } else {
            this.homeService.studentLoggedIn = true;
            this.studentLoggedIn = true;
            this.router.navigate(['home', 'flights']);
        }
        
        this.homeService.userSelected
            .subscribe(
                (user: User) => {
                    if(user)
                        this.router.navigate(['home', 'flights']);
                    this.selectedUser = user;
                    this.displayFlight = true;
                }
            );
        
        this.flights = this.homeService.getCurrentUserFlights();
    }
}