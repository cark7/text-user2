import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, Setores } from 'src/app/services/modelos';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {
  //List
  listSector: Setores[] = new Array
  listSectorOringin: Setores[] = new Array

  constructor(
    private http: HttpClient,
    private services: ServicesService
  ) { }

  ngOnInit(): void {
    this.getListSector()
  }

  getListSector() {

    let response = this.services.listSectores().subscribe(res => {
      console.log(res)
      this.listSector = res
      this.listSectorOringin = res
    }, error => {
      console.log('error', error)
    })
  }
  
  applyFilter(event: any,value: string) {
    if(event.keyCode == 46 || event.keyCode == 8){ // en caso de borrado reset el listado 
      this.listSector = this.listSectorOringin
    }
    let tempList: Setores[] = this.listSector
      console.log(' filter: ', value)
      
    this.listSector = tempList.filter( e => {
        return e.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
  }
}
