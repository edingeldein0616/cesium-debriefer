import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CesiumInfoComponent } from './cesium-info/cesium-info.component';

import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.css']
})
export class CesiumMapComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  onBack() {
    this.router.navigate(['home']);
    this.authService.flightStarted.emit(false);
  }

  ngOnInit() {
    var script = document.createElement('script');
    script.src = './assets/js/flight.js';
    document.body.appendChild(script);
    
    //Hide header component
    this.authService.flightStarted.emit(true);
  }

}
