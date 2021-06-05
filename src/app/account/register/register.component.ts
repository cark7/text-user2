import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  apiLink = "http://home.drauber.info:3333/";
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private http: HttpClient,
  ) { 
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      pass: ['', Validators.required],
       
    });
  }


  ngOnInit(): void {
  }

  onSubmit(){
    console.log('cadastar');
    this.serv_newUser().subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/account/login']);
      },
      error=>{
        //console.log('erroorr: ',error)
        //this.b_mensaje = true;
        //this.mensaje = 'Datos Incorrectos!!';
          console.log("Some error occured")
        //this.b_mensaje = true;
        //this.mensaje = this.constantes.error_servidor;
      }
    ) 
  }
  serv_newUser(): any {
    let datos = {
      "name": String(this.registerForm.value.name),
      "email": String(this.registerForm.value.email),
      "password": String(this.registerForm.value.pass),
    }
    console.log('datos send login web: ', datos);
    let response;
    try {
      response = this.http.post < any > (`${this.apiLink}` + "users/",
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

}
