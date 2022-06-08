import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  pname: string
  pqty: string
  reqst: any

  constructor(private route: Router, private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {
  }

  create(){
    const userId = JSON.parse(localStorage.getItem('User'))
    console.log(userId)
    let product = {
      pname: this.pname,
      pqty: this.pqty,
      reqst: false,
      UserId: userId.userId
    }

    const user = localStorage.getItem('User')
    if(userId.userId == null){
      this.route.navigateByUrl('/login', {replaceUrl: true});

      return
    }else{

    this.http.post('http://localhost:5000/products/criar', product).subscribe(res => {
      localStorage.setItem('User', JSON.stringify(res))
      this.route.navigateByUrl('/home', {replaceUrl: true})
      
    }), error => {
      this.presentAlert('Ocorreu um erro', error.error.message)
    }
  }
  }
  navigateToHomePage(){
 this.route.navigateByUrl('/home')
  }

 navigateToProductPage(){
  this.route.navigateByUrl('/product')
  }

  navigateToUserPage(){
    this.route.navigateByUrl('/user')
    }

    async presentAlert(header: string, message: string) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: header,
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    }

}
