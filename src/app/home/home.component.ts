import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

import { User } from '../authentication/user.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [HomeService]
})
export class HomeComponent implements OnInit {

    constructor(private homeService: HomeService, private router: Router) {}

    private permission: string;
    userSelected: User;
    displayFlight: boolean = true;
    flightSelected: boolean = false;
    studentLoggedIn = true;

    ngOnInit() {
        this.homeService.initCurrentUser();

        this.permission = localStorage.getItem('permission');
        if(this.permission !== 'STUDENT') {
            this.homeService.studentLoggedIn = false;
            this.studentLoggedIn = false;
        } else {
            this.homeService.studentLoggedIn = true;
        }
        
        this.homeService.userSelected
            .subscribe(
                (user: User) => {
                    this.userSelected = user;
                    this.displayFlight = true;
                }
            );

        this.homeService.flightOpened
            .subscribe(
                (status: boolean) => {
                    this.displayFlight = !status;
                    if(status) {
                        this.router.navigate(['/home', 'flight-info']);
                        return;
                    }
                    this.router.navigate(['home']);
                }
            )
    }
}