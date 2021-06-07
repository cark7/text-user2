import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, Setores } from 'src/app/services/modelos';
import { ServicesService } from 'src/app/services/services.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {
  //List
  listUsers: User[] = new Array
  //listUsersOringin: User[] = new Array
  listSetores: Setores[] = new Array
  listSetoresOringin: Setores[] = new Array

  showDetails: boolean = false
  usersBySector: User[] = new Array
  indexSetorSelected: number
  idSetorSelected: string
  userSelected: User;
  showLink: boolean = false

  constructor(
    private http: HttpClient,
    private services: ServicesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getListSetores()
    this.getListUsers()
  }
  getListSetores(){
    let response = this.services.listSectores().subscribe(res => {
      console.log(res)
      this.listSetores = res
      this.listSetoresOringin = res
    }, error => {
      console.log('error', error)
    })
  }

  getListUsers() {
    let response = this.services.listUsers().subscribe(res => {
      console.log(res)
      this.listUsers = res
      this.userSelected = res[0]
      
    }, error => {
      console.log('error', error)
    })
  }
  
  applyFilter(event: any,value: string) {
    if(event.keyCode == 46 || event.keyCode == 8){ // en caso de borrado reset el listado 
      this.listSetores = this.listSetoresOringin
      
    }
    let tempList: Setores[] = this.listSetores
      console.log(' filter: ', value)
      
    this.listSetores = tempList.filter( e => {
        return e.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
  }
  actDetails(id: string, index){
    console.log('id', id, 'index', index)
    this.idSetorSelected = id
    this.indexSetorSelected = index
    console.log('nome', this.indexSetorSelected)
    this.searchUsers()
    this.showDetails = true
  }
  searchUsers(){
    let usersBySector_let: User[] = new Array
    
    this.listUsers.forEach(e=> {
      let element = e.setores.find( e => e.id == this.idSetorSelected )
      if(element != undefined){
        usersBySector_let.push(e) 
      }
      
    })
    console.log('list',  usersBySector_let)
    this.usersBySector = usersBySector_let

  }
  activeLink(select: User){
    this.showLink = true
    this.userSelected = select
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Eu entendi ', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  validRepetition(user: User, setor: Setores): boolean{
    let result, isreapet
    result = user.setores.find(e => e.id == setor.id);
    isreapet = result != null ?  true:  false
    console.log('busqueda ', isreapet)
    return isreapet
  }
  vincular(){
    let id_user = this.listSetores[this.indexSetorSelected].id, id_setor = this.userSelected.id
    let isreapet: Boolean
    isreapet = this.validRepetition(this.userSelected,this.listSetores[this.indexSetorSelected] )
    if (isreapet) {
      this.openSnackBar('o usuário já está vinculado ao setor')
    } else {
      let response = this.services.vincularUserSector(id_user,id_setor).subscribe(res => {
        console.log(res)
        this.getListUsers()
        this.openSnackBar('registro vinculado com sucesso')
      }, error => {
        console.log('error', error)
        this.openSnackBar('não foi possível vincular')
      })
    }
  }


  fnData(data: string): string{
    let ano = data.slice(0,4)
    let day = data.slice(8,10)
    let month = data.slice(5,7)
    return (day +'/'+month+'/'+ano)
  }
  
}