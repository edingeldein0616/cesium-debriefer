import { Component, OnInit } from '@angular/core';

import { AuthService } from '../authentication/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    showLogoutButton: boolean = false;
    loggedInUser: string;
    
    constructor(private authService: AuthService) {}

    onLogout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.authService.loginStatusChange.subscribe(
            (status: boolean) => {
                this.showLogoutButton = status
                this.loggedInUser = localStorage.getItem('user');
            }
        );
        if (localStorage.getItem('token')) {
            this.showLogoutButton = true;
            this.loggedInUser = localStorage.getItem('user');
        }
    }
}