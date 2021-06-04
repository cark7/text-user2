import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SectorComponent } from './sector/sector.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    MainComponent,
    SectorComponent,
    UsersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
