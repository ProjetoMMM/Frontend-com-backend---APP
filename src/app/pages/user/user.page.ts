import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  products: any
  users: any
  constructor(private route: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // verificação de login
    const user = JSON.parse(localStorage.getItem('User'))

    console.log(user.userId)
   
    if(user == null){
      this.route.navigateByUrl('/user', {replaceUrl: true});
    }else{
      this.http.get('http://localhost:5000/products/', user).subscribe(res => {
        this.products = res
        console.log(res)
      }), error => {
        console.log(error)
        }
      }
    }

  mostrar(){
    const user = JSON.parse(localStorage.getItem('User'))
    const userId = user.userId
    this.http.get('http://localhost:5000/users/mostrar', userId).subscribe(res => {
      this.users = res
      console.log(res)
    }), error => {
      console.log(error)
    }
  }

  navigateToHomePage(){
 this.route.navigate(['home']);
  }

 navigateToProductPage(){
  this.route.navigate(['product'])
  }

  navigateToUserPage(){
    this.route.navigate(['user'])
    }

}

