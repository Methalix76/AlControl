import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(private navCtrl: NavController, private loadingController: LoadingController) {}

  async pruebaClickLogin() {
    console.log('Botón btnlogin clickeado');
    const loading = await this.loadingController.create({
      message: 'Dirigiendo a Login...',
      duration: 300 // Duración en milisegundos
    });
    await loading.present();
    setTimeout(() => {
      this.navCtrl.navigateForward('/login');
    }, 1000);
  }

  pruebaClickRegistro() {
    console.log('Botón btnregistro clickeado');
    this.navCtrl.navigateForward('/register');
  }
}