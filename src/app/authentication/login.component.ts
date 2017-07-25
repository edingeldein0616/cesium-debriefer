import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    invalidCredentials = false;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        const user = new User(
            this.loginForm.value.username,
            this.loginForm.value.password);
        const response = this.authService.checkLogin(user);
        if(response.index == -1) {
            return this.invalidLogin();
        }
        this.authService.loginUser(user, response);
    }

    invalidLogin() {
        this.invalidCredentials = true;
        this.loginForm.reset();
    }

    ngOnInit() {
        if(localStorage.getItem('token')) {
            this.router.navigate(['home']);
        }
        this.loginForm = new FormGroup({
            username: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
    }
}