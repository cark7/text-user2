import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SectorComponent } from './sector/sector.component';
import { UsersComponent } from './users/users.component';

import { MainRoutingModule } from './main.routing'
import { MaterialModule } from '../services/material-module' 
@NgModule({
  declarations: [
    MainComponent,
    SectorComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
