import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string
  password: string
  constructor(private http: HttpClient, private route: Router, private alertController: AlertController) {}

  ngOnInit() {
  }

  login(){
    let credentials = {
      email: this.email,
      password: this.password
    }

    console.log(credentials)

    this.http.post('http://localhost:5000/users/login', credentials).subscribe(res => {
      localStorage.setItem('User', JSON.stringify(res))
      this.route.navigateByUrl('/home', {replaceUrl: true})

    }, error => {
      this.presentAlert('Login Failed', error.error.message)
    })

    
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

  navigateToRedefinir(){
    this.route.navigate(['esquecisenha'])
  }
  

}