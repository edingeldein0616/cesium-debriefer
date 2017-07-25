import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../authentication/auth.service';
import { HomeService } from '../home.service';

import { User } from '../../authentication/user.model';
import { Flight } from '../flights/flight.model';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
    
    constructor(private authService: AuthService, private homeService: HomeService) {}
    
    activeTab: string = 'Students';
    activeRow: number;
    pilots: User[] = [];

    getActiveRow() : number {
        return this.activeRow;
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
        this.homeService.userSelected.emit(pilot);
    }

    onTabSelect(tab: string) {
        this.activeTab = tab;
        this.activeRow = null;
        this.homeService.userSelected.emit(null);
        const selector = tab === 'Students' ? 'STUDENT' : 'INSTRUCTOR';
        this.pilots = this.homeService.getVisibleUsers(selector);
    }

    ngOnInit() {
        this.homeService.initVisibleUsers();
        this.onTabSelect('Students');
    }
}