import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './authentication/login.component';
import { HomeComponent } from './home/home.component';
import { FlightsComponent } from './home/flights/flights.component';
import { StudentsComponent } from './home/students/students.component';
import { FlightInfoComponent } from './home/flight-info/flight-info.component';
import { CesiumMapComponent } from './cesium-map/cesium-map.component';
import { CesiumInfoComponent } from './cesium-map/cesium-info/cesium-info.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { HoverDirective } from './directives/hover.directive';

import { AuthService } from './authentication/auth.service';
import { Http } from '@angular/http';

import { routing } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        HomeComponent,
        FlightsComponent,
        StudentsComponent,
        FlightInfoComponent,
        CesiumMapComponent,
        CesiumInfoComponent,
        DropdownDirective,
        HoverDirective
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        routing,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}