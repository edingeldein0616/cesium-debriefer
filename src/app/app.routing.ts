import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './authentication/login.component';
import { HomeComponent } from './home/home.component';
import { FlightInfoComponent } from './home/flight-info/flight-info.component';
import { CesiumMapComponent } from './home/flight-info/cesium-map/cesium-map.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, 
        children: [
            {path: 'flight-info', component: FlightInfoComponent},
            {path: 'flight-display', component: CesiumMapComponent}
    ]}  
];

export const routing = RouterModule.forRoot(APP_ROUTES);