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
    let product = {
      pname: this.pname,
      pqty: this.pqty,
      reqst: false
    }

    this.http.post('http://localhost:5000/products/criar', product).subscribe(res => {
      localStorage.setItem('User', JSON.stringify(res))
      this.route.navigateByUrl('/home', {replaceUrl: true})
    }), error => {
      this.presentAlert('Login Failed', error.error.message)
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
