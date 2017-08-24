import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model';
import { Flight } from '../home/students/flights/flight.model';

@Injectable()
export class AuthService implements OnInit {

    loginStatusChange = new EventEmitter<boolean>(); // HeaderComponent
    flightStarted = new EventEmitter<boolean>(); // Header Component
    private loggedInUser: User;
    users: User[] = [
        // username, password, userId, permission, firstname, lastname
        new User('admin', 'testPass', '5498753', 'ADMIN'),
        new User('flight.instructor', 'instruct', '1549854', 'INSTRUCTOR', 'Chuck', 'Yeager'),
        new User('erich.dingeldein', 'student', '1832680','STUDENT', 'Erich', 'Dingeldein'),
        new User('student.one', 'student', '9842165','STUDENT', 'Some', 'Girl'),
        new User('student.two', 'student', '1468720','STUDENT', 'Someother', 'Guy'),
        new User('student.three', 'student', '5789642','STUDENT', 'Another', 'Person')
    ];

    flights: Flight[] = [
        //        airfield, date, length, flightId, studentId, instructorId
        new Flight('KGFK', '2017-06-15 T13:45:30 UTC', '2h15m', '00', '1832680', '1549854'),
        new Flight('KGFK', '2017-06-15 T14:20:00 UTC', '1h15m', '00', '9842165', '1549854'),
        new Flight('KGFK', '2017-06-17 T10:08:00 UTC', '2h30m', '00', '1832680', '1549854'),
        new Flight('KGFK', '2017-06-18 T15:52:30 UTC', '2h00m', '00', '1832680', '1549854'),
        new Flight('KGFK', '2017-06-19 T09:32:30 UTC', '1h45m', '00', '9842165', '1549854'),
        new Flight('KGFK', '2017-06-20 T13:21:30 UTC', '1h00m', '00', '1832680', '1549854'),
        new Flight('KGFK', '2017-06-21 T16:20:30 UTC', '0h45m', '00', '1468720', '1549854'),
        new Flight('KGFK', '2017-06-22 T11:25:30 UTC', '3h00m', '00', '1832680', '1549854'),
    ];

    constructor(private router: Router) {}

    /* Checks if the user input correct login information for any user object in the array.
       Returns object with an index representing the success of the check, and the user's permission level.
       Will return -1 index and empty permission if user wasn't found. */
    checkLogin(checkUser: User) : any {
        let index = this.users.findIndex((user: User) : boolean => {
            if(user.password === checkUser.password) {
                return true;
            }
            return false;
        });
        if(index < 0) {
            return {index: -1, permission: ''};
        }
        return {index: index, permission: this.users[index].getPermission()}
    }

    //Sets up local storage and changes correct login status variables to allow rendering of home component
    loginUser(user: User, response: any) {

        //Keep track of logged in user in auth component and set the user's permission
        this.loggedInUser = user;
        user.setPermission(response.permission);

        //Set up local storage for session.
        localStorage.setItem('token', 'randomToken');
        localStorage.setItem('user', user.username);
        localStorage.setItem('permission', response.permission);

        //Emit login status change to render logout button.
        //Route to .../home to render home component
        this.loginStatusChange.emit(true);
        this.router.navigate(['home']);
    }

    //Clears the local storage and reroutes to the login component
    logout() {
        localStorage.clear();
        this.loggedInUser = null;
        this.loginStatusChange.emit(false);
        this.router.navigate(['/']);
    }

    // Returns the correct array of users to display in StudentsComponent given the permission level of the input user.
    getUsers(permission: string) : User[] {
        
        if(permission === 'ADMIN') {
            return this.users;
        } 
        
        let temp: User[] = [];
        if (permission === 'INSTRUCTOR') {
            for(let user of this.users) {
                if(user.getPermission() === 'STUDENT') {
                    temp.push(user);
                }
            }
        } else if (permission === 'STUDENT') {
            for(let user of this.users) {
                if(user.username === 'erich.dingeldein') {
                    temp.push(user);
                    break;
                }
            }
        }
        
        return temp;
    }

    // Returns currently logged in user.
    getLoggedInUser() : User {
        return this.loggedInUser;
    }

    setLoggedInUser(username: string) {
        for(let user of this.users) {
            if(user.username === username) {
                this.loggedInUser = user;
                break;
            }
        }
    }

    // Returns the flights that contain current user id.
    getUsersFlights(user : User) : Flight[] {
        let userId = '';
        let matchedFlights : Flight[] = [];
        if(!user) {
            userId = this.loggedInUser.getId();
        } else {
            userId = user.getId();
        }

        for(let flight of this.flights) {
            if(userId === flight.studentId || userId === flight.instructorId) {
                matchedFlights.push(flight);
            }
        }
        return matchedFlights;
    }

    // used in app component
    assignFlights() {

        for(let user of this.users) {
            const id = user.getId();
            for(let flight of this.flights) {
                if(id === flight.studentId || id === flight.instructorId) {
                    user.addFlight(flight);
                }
            }
        }

    }

    ngOnInit() {

    }

}