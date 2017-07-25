import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { AuthService } from './authentication/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    constructor(private authService: AuthService) {}

    ngOnInit () {
        if(localStorage.getItem('token')) {
            this.authService.setLoggedInUser(localStorage.getItem('user'))
        }
    }
}