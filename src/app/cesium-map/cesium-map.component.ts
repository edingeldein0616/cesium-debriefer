import { Component, OnInit } from '@angular/core';

import { CesiumInfoComponent } from './cesium-info/cesium-info.component';

@Component({
  selector: 'app-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.css']
})
export class CesiumMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var script = document.createElement('script');
    script.src = './assets/js/flight.js';
    document.body.appendChild(script);
  }

}
