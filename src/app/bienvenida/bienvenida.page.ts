//Este es mi: bienvenida.page.ts

import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: false,
})
export class BienvenidaPage implements OnInit {
  nombreCompleto: string = 'Usuario';
  userType: string = ''; 

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController 
  ) {}

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    const loading = await this.loadingController.create({
      message: 'Cargando tus datos...',
    });
    await loading.present();

    try {
      const user = this.auth.currentUser;

      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          this.nombreCompleto = `${userData['nombre']} ${userData['apellido']}`;
          this.userType = userData['tipoUsuario']; // Obtenemos el tipo de usuario

          // Validación del tipo de usuario
          if (this.userType === 'administrador') {
            await this.presentToast('Acceso denegado: Los administradores no pueden ingresar aquí.', 'danger');
            await this.auth.signOut(); // Cerrar sesión automáticamente
            this.navCtrl.navigateRoot('/login');
          }

        } else {
          //console.warn('No se encontraron datos adicionales para el usuario en Firestore.');
          this.nombreCompleto = 'Usuario (datos no encontrados)';
          await this.presentToast('No se encontraron datos de usuario. Por favor, intente de nuevo.', 'warning');
          await this.auth.signOut();
          this.navCtrl.navigateRoot('/login');
        }
      } else {
        //console.log('No hay usuario logueado, redirigiendo a /login');
        this.navCtrl.navigateRoot('/login');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      this.nombreCompleto = 'Error al cargar datos';
      await this.presentToast('Ocurrió un error al cargar sus datos. Por favor, intente de nuevo.', 'danger');
      await this.auth.signOut(); // Considerar cerrar sesión en caso de error grave
      this.navCtrl.navigateRoot('/login');
    } finally {
      await loading.dismiss();
    }
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

 
  async goToVerMedicamento() {
    this.navCtrl.navigateForward('/vermed');
    
  }

  // Navegación para "Agregar Medicamento"
  goToAgregarMedicamento() {
    this.navCtrl.navigateForward('/agr-med'); 
    }

  // Navegación para "Consulta historial" (futuro)
  async goToConsultaHistorial() {
    //await this.presentToast('Funcionalidad "Consulta Historial" en desarrollo.', 'secondary');
    this.navCtrl.navigateForward('/consulthist');
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      duration: 1000
    });
    await loading.present();
    await this.auth.signOut();
    await loading.dismiss();
    this.navCtrl.navigateRoot('/home');
  }
}