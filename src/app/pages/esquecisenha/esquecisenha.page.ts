import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-esquecisenha',
  templateUrl: './esquecisenha.page.html',
  styleUrls: ['./esquecisenha.page.scss'],
})
export class EsquecisenhaPage implements OnInit {

  email: any
  password: any
  confirmpassword: any

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  redefinir() {
    let user = {
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword
    }

    this.http.post('http://localhost:5000/users/redefinir', user).subscribe(res => {
      localStorage.setItem('User', JSON.stringify(res))
      this.router.navigateByUrl('/home', {replaceUrl: true})
    }), error => {
      this.presentAlert('Login Failed', error.error.message)
    }
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
