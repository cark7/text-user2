import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  apiLink = "http://home.drauber.info:3333/";
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { 
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
       
    });
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/main/users']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('login');
    this.serv_inicioSesion().subscribe(
      res=>{
        console.log(res);
        console.log('token', res.token);
        console.log('email', res.user.email);
        
          this.saveLocal(res.token, res.user.email, res.user.id, res.user.name);
          this.router.navigate(['/main/users']);
        
          
        
      },
      error=>{
        console.log("Some error occured")
        this.openSnackBar('informação não corresponde')
      }
    ) 
  }
  serv_inicioSesion(): any {
    let datos = {
      "email": String(this.loginForm.value.user),
      "password": String(this.loginForm.value.pass),
    }
    console.log('datos send login web: ', datos);
    let response;
    try {
      response = this.http.post < any > (`${this.apiLink}` + "sessions/",
      datos, {
          headers: {
            //'Content-Type': "application/x-www-form-urlencoded"
            'Content-Type':  'application/json'
          }
        }
      );
    } catch (error) {
      console.log("error:" + error)
    }

    return response;
  }
  saveLocal(token: any,  email, idUser, name){
    localStorage.setItem('token', token);
    localStorage.setItem('user', email);
    localStorage.setItem('id_user', idUser);
    localStorage.setItem('name', name);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, ' ok ', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
