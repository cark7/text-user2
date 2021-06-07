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
  selector: 'app-myinformation',
  templateUrl: './myinformation.component.html',
  styleUrls: ['./myinformation.component.scss']
})
export class MyinformationComponent implements OnInit {
  //List
  listUsers: User[] = new Array
  //listUsersOringin: User[] = new Array
  listSetores: Setores[] = new Array
  loadList: boolean = true

  //showDetails: boolean = false
  userSelected: User;
  userId: string =  localStorage.getItem('id_user');
  //indexUserSelected: number
  setorSelected: Setores;
  showLink: boolean = false

  

  constructor(
    private http: HttpClient,
    private services: ServicesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getListUsers()
    this.getListSetores()
  }
  
  getListUsers() {
    let response = this.services.listUsers().subscribe(res => {
      console.log(res)
      this.listUsers = res
      console.log('id en almacen: ', this.userId)
      this.userSelected = this.listUsers.find(e => e.id == this.userId)
      console.log('o user é: ', this.userSelected)
    }, error => {
      console.log('error', error)
    })
  }
  //setores
  getListSetores(){
    let response = this.services.listSectores().subscribe(res => {
      console.log(res)
      this.listSetores = res
      this.setorSelected = res[0]
      this.loadList = false
    }, error => {
      console.log('error', error)
    })
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
    let id_user = this.userSelected.id, id_setor = this.setorSelected.id
    let isreapet: Boolean
    isreapet = this.validRepetition(this.userSelected,this.setorSelected )
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
