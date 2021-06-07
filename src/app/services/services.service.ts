import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  token= localStorage.getItem('token');
  apiLink = "http://home.drauber.info:3333/";

  constructor(
    private http: HttpClient,
  ) { }
  
  // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json', 
                                'Authorization': "Token " + this.token}) 
    
  }   
  
  listSectores(){
    let response;

    try { //data,
      response = this.http.get < any > (`${this.apiLink}`+'setor/', this.httpOptions); 
    } catch (error) {
      console.log("error:" + error)
    }

    return response;
  }
  listUsers(){
    let response;

    try { //data,
      response = this.http.get < any > (`${this.apiLink}`+'users/list', this.httpOptions); 
    } catch (error) {
      console.log("error:" + error)
    }

    return response;
  }
  vincularUserSector(user_id: string, sector_is: string){
    let data = { 
      "setor_id": sector_is, 
      "user_id": user_id,
    }
    let response;
    console.log('data vincular ', data)
    try { //data,
      response = this.http.post < any > (`${this.apiLink}`+'usersSetores/',data, this.httpOptions); 
    } catch (error) {
      console.log("error:" + error)
    }

    return response;
  }


}
