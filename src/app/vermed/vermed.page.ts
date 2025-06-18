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
  // cambio aqui 2 - Agregadas propiedades para los datos
  usuario: string = 'Nombre del Usuario'; // Valor por defecto
  diagnostico: string = 'Diagnóstico del paciente';
  medicamento: string = 'Nombre del medicamento';
  dosis: string = 'Dosis indicada';
  imagen: string = 'deberia caragar la imagen registrada al medicamento';
  proxima_dosis: string = 'Hora Proxima dosis';
  proxima_dosis_2: string = 'Hora Siguinte dosis';
  constructor(
    private auth: Auth,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // cambio aqui 3 - Aquí podrías cargar datos reales desde un servicio
    // this.cargarDatosMedicamento();
  }

  // cambio aqui 4 - Método de ejemplo para cargar datos (descomentar si se implementa)
  /*
  async cargarDatosMedicamento() {
    const loading = await this.loadingController.create({
      message: 'Cargando datos...'
    });
    await loading.present();
    
    try {
      // Aquí iría la lógica para obtener los datos reales
      // Ejemplo: desde Firebase o una API
      this.usuario = 'Datos reales del usuario';
      this.diagnostico = 'Diagnóstico real';
      this.medicamento = 'Medicamento real';
      this.dosis = 'Dosis real';
      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      this.presentToast('Error al cargar datos', 'danger');
    }
  }
  */

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