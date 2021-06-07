import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SectorComponent } from './sector/sector.component';
import { UsersComponent } from './users/users.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main.routing'
import { MaterialModule } from '../services/material-module' 

import { ServicesService } from '../services/services.service'
@NgModule({
  declarations: [
    MainComponent,
    SectorComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ], 
  providers: [
    ServicesService
  ]
})
export class MainModule { }
