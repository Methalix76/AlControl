import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-vermed',
  templateUrl: './vermed.page.html',
  styleUrls: ['./vermed.page.scss'],
  standalone: false,
})
export class VermedPage implements OnInit {
  
  
  constructor(
    private auth: Auth,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('/bienvenida');
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      duration: 1000
    });
    await loading.present();
    
    try {
      await this.auth.signOut();
      await loading.dismiss();
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      await loading.dismiss();
      this.presentToast('Error al cerrar sesión', 'danger');
      console.error('Error al cerrar sesión:', error);
    }
  }

  
}