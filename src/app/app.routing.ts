import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './authentication/login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './home/students/students.component';
import { FlightsComponent } from './home/students/flights/flights.component';
import { FlightInfoComponent } from './home/students/flights/flight-info/flight-info.component';
import { CesiumMapComponent } from './cesium-map/cesium-map.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, 
        children: [
            {path: 'students', component: StudentsComponent},
            {path: 'flights', component: FlightsComponent},
            {path: 'info', component: FlightInfoComponent}
    ]},
    {path: 'flight-display', component: CesiumMapComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);//, {enableTracing: true});