import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  apiLink = "http://home.drauber.info:3333/";
  email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passConfir: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { 
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4)]],
      email: ['',  [Validators.required, Validators.pattern(this.email)]],
      pass: ['', [Validators.required,Validators.minLength(6)]],
      confpass: ['', Validators.required], 
      passConfir: [false, Validators.requiredTrue], 
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
        this.openSnackBar('Algo deu errado')
        console.log("Some error occured")
        
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

  onBlur(){
    if (this.registerForm.value.confpass != '') {
      
    
      if (this.registerForm.value.pass == this.registerForm.value.confpass) {
      console.log('confirmada clave');
      //this.registerForm.setValue['passConfir'] = true
      this.registerForm.controls['passConfir'].setValue(true);
      } else {
        this.registerForm.controls['passConfir'].setValue(false);
      this.openSnackBar('As Senhas não coincidem')
      }
    }
    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, ' ok ', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
