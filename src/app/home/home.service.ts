import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { User } from '../authentication/user.model';
import { Flight } from './students/flights/flight.model';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class HomeService {
    
    
    // flightSelected = new EventEmitter<Flight>();
    currentUser: User;
    selectedUser: User;
    selectedRow: number;
    selectedTab: string = 'Students';
    studentLoggedIn: boolean = true;
    userSelected = new EventEmitter<User>(); //HomeComponent, FlightsComponent, UsersComponent
    private visibleUsers: User[] = [];
    private currentUserFlights: Flight[] = [];

    constructor(private http: Http, private authService: AuthService) {}

    /* Retrieves initializes all of the data that will be associated with the currently logged in user such as
       a list of users and flights the current user will be able to see. */
    initCurrentUser() {
        this.currentUser = this.authService.getLoggedInUser();
        if(this.currentUser.getPermission() !== 'STUDENT') {
            this.initVisibleUsers();
        }
        this.initCurrentUserFlights();
    }

    // Retrieves flights associated with the user's id.
    initCurrentUserFlights() {
        this.currentUserFlights = this.authService.getUsersFlights(this.currentUser);
    } 
    
    // Retrieves users that will be visible to the current user based off of their permission level.
    initVisibleUsers() {
        this.visibleUsers = this.authService.getUsers(localStorage.getItem('permission'));
        // this.visibleUsers[2].flights = this.authService.getFlights();
    }
    
    // Returns flights associated with the current user.
    getCurrentUserFlights() {
        return this.currentUserFlights;
    }

    // Returns visibleUsers array sorted by type of user.
    getVisibleUsers(type?: string) {
        if(!type) {
            return this.visibleUsers;
        }

        let temp: User[] = []
        if(type === 'STUDENT') {
            for(let user of this.visibleUsers) {
                if(user.getPermission() === type) {
                    temp.push(user);
                }
            }
        } else if(type === 'INSTRUCTOR') {
            for(let user of this.visibleUsers) {
                if(user.getPermission() === type) {
                    temp.push(user);
                }
            }
        }
        return temp;
    }

    getSelectedUser() : User {
        return this.selectedUser;
    }

    setSelectedUser(user: User) {
        this.selectedUser = user;
        this.currentUserFlights = user.flights;
        this.userSelected.emit(user);
    }

}