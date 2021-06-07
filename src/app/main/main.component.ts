import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateToken()
  }
  validateToken(){
    console.log('token ', localStorage.getItem('token'))
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/account/login']);
    }
  }
  exit(){
    console.log('sair')
    localStorage.clear()
    this.router.navigate(['/account/login']);
  }
}
