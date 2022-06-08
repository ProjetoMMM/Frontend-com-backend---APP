import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  name: string
  email: string
  state: string
  cell: string
  password: string
  confirmpassword: string

  
  constructor(private http: HttpClient, private router:Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  register(){
    let user = {
      email: this.email,
      password: this.password,
      name: this.name,
      state: this.state,
      cell: this.cell,
      confirmpassword: this.confirmpassword,
    }

    this.http.post('http://localhost:5000/users/registro', user).subscribe(res => {
      localStorage.setItem('User', JSON.stringify(res))
      this.router.navigateByUrl('/home', {replaceUrl: true})
    }, error => {
      this.presentAlert('Ocorreu uma falha no registro!', error.error.message)
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

}
