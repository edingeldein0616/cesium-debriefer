import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularCesiumModule } from 'angular-cesium';
import { CesiumMapComponent } from './cesium-map/cesium-map.component';

@NgModule({
  declarations: [
    AppComponent,
    CesiumMapComponent
  ],
  imports: [
    BrowserModule,
    AngularCesiumModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
