import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, Setores } from 'src/app/services/modelos';
import { ServicesService } from 'src/app/services/services.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  //List
  listUsers: User[] = new Array
  listUsersOringin: User[] = new Array
  listSetores: Setores[] = new Array

  showDetails: boolean = false
  //userSelected: User;
  indexUserSelected: number
  setorSelected: Setores;
  showLink: boolean = false

  //filter
  showAll: boolean = true;
  showTodosAct: boolean = true
  showAdmins: boolean = false
  //showUsers: boolean = true
  filter_numSet: number = 0
  secondTimeFilter: boolean = false
  valuefiletrText: string
  //filter_dateStart: any
  //filter_dateEnd: any

  constructor(
    private http: HttpClient,
    private services: ServicesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getListUsers()
    
  }
  
  getListUsers() {

    let response = this.services.listUsers().subscribe(res => {
      console.log(res)
      this.listUsers = res
      this.listUsersOringin = res
    }, error => {
      console.log('error', error)
    })
  }
  //setores
  getListSetores(){
    let response = this.services.listSectores().subscribe(res => {
      console.log(res)
      this.listSetores = res
      console.log('selector sector viejo', this.setorSelected)
      this.setorSelected = res[0]
      console.log('selector sector nuevo', this.setorSelected)
      //this.listUsersOringin = res
    }, error => {
      console.log('error', error)
    })
  }
  
  applyFilter(event: any,value: string) {
    this.valuefiletrText = value
    if(event.keyCode == 46 || event.keyCode == 8){ // en caso de borrado reset el listado 
      this.listUsers = this.listUsersOringin
      this.applyFilterControls()
    }
    let tempList: User[] = this.listUsers
      console.log(' filter: ', value)
      
    this.listUsers = tempList.filter( e => {
        return e.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
  }

  fn_showAll(){
    console.log('all')
    if (this.showAll) {
      this.listUsers = this.listUsersOringin
    }
  }
  
  applyFilterControls(){
    if(this.secondTimeFilter){
      this.listUsers = this.listUsersOringin
      //console.log('value filter ', this.valuefiletrText)
      if (this.valuefiletrText != undefined) {
        console.log('value filter 2 ', this.valuefiletrText)
          this.listUsers = this.listUsers.filter( e => {
          return e.name.toLowerCase().indexOf(this.valuefiletrText.toLowerCase()) > -1;
        })
      }
      
    }
    this.secondTimeFilter = true
    this.showDetails = false
    console.log('lista1: ', this.listUsers)
    if (this.filter_numSet > 0) {
      this.listUsers = this.listUsers.filter(e => {
        return e.setores.length > this.filter_numSet
      })
    }
    console.log('lista2: ', this.listUsers)
    if (this.showAdmins) {
      this.listUsers = this.listUsers.filter(e => {
        return e.admin == true
      })
    }
  }
  actDetails(index: number){
    this.showDetails = true
    this.indexUserSelected = index
    //this.userSelected = this.listUsers[index]
    this.getListSetores()
  }
  activeLink(select: Setores){
    this.showLink = true
    this.setorSelected = select
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
    let id_user = this.listUsers[this.indexUserSelected].id, id_setor = this.setorSelected.id
    let isreapet: Boolean
    isreapet = this.validRepetition(this.listUsers[this.indexUserSelected],this.setorSelected )
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


/*
showValuesFilter(){
    console.log('active ', this.showAdmins)
    console.log('active ', this.filter_numSet)
  }
*/