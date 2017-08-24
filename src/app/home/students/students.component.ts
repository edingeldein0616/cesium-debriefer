import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../authentication/auth.service';
import { HomeService } from '../home.service';

import { User } from '../../authentication/user.model';
import { Flight } from './flights/flight.model';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
    
    constructor(private authService: AuthService, private homeService: HomeService) {}
    
    // Form setup
    searchForm = new FormGroup({
        searchBox : new FormControl('')
    });
    searchInput : string = '';

    activeTab: string = 'Students';
    activeRow: number;
    pilots: User[] = [];

    getActiveRow() : number {
        return this.activeRow;
    }

    filter() {
        const searchString = this.searchForm.value.searchBox.toLowerCase().trim();
        let allUsers = this.getUsers();
        let newPilotArray : User[] = [];

        // Search string is empty, refill pilots array with all visible users
        if(searchString === '') {
            this.onTabSelect(this.activeTab);
            return;
        }

        // Go through array of current visible users and search for substrings of first and last name
        for(let user of allUsers) {
            const name = user.firstname.toLowerCase() + ' ' + user.lastname.toLowerCase();
            if(name.includes(searchString)) {
                newPilotArray.push(user);
            }
        }

        // Replace visible array with array of users with first and lastname string containing a substring equivalent to search string.
        console.log(newPilotArray);
        this.pilots = newPilotArray;
    }    

    hideTabs() : boolean {
        if(localStorage.getItem('permission') !== 'ADMIN') {
            return true;
        }
        return false;
    }

    onSelect(index: number) {
        this.activeRow = index;
        const pilot = this.pilots[index];
        this.homeService.setSelectedUser(pilot);
    }

    onTabSelect(tab: string) {
        this.activeTab = tab;
        this.homeService.selectedTab = tab;
        this.activeRow = null;
        this.homeService.userSelected.emit(null);
        const selector = tab === 'Students' ? 'STUDENT' : 'INSTRUCTOR';
        this.pilots = this.homeService.getVisibleUsers(selector);
    }
    
    getUsers() : User[] {
        const selector = this.activeTab === 'Students' ? 'STUDENT' : 'INSTRUCTOR';
        return this.homeService.getVisibleUsers(selector);
    }

    ngOnInit() {
        this.homeService.initVisibleUsers();
        this.onTabSelect(this.homeService.selectedTab);
    }
}