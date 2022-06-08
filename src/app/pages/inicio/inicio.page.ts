import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
inicial = "/assets/home_screen_page.jpg";
constructor(private route: Router) {}

ngOnInit() {
}

loginPage(){
  this.route.navigate(['login']) 
 }


}