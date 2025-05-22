import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: false, 
})
export class BienvenidaPage implements OnInit {
  nombreCompleto: string = 'Usuario'; // Esta variable se actualizará con el nombre y apellido

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private loadingController: LoadingController,
    private navCtrl: NavController
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
        // Obtenemos una referencia al documento del usuario en la colección 'users'
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        // Obtenemos la 'snapshot' del documento
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          this.nombreCompleto = `${userData['nombre']} ${userData['apellido']}`;
        } else {
          console.warn('No se encontraron datos adicionales para el usuario en Firestore.');
          this.nombreCompleto = 'Usuario (datos no encontrados)'; // Si no se encuentran datos
        }
      } else {
        console.log('No hay usuario logueado, redirigiendo a /login');
        this.navCtrl.navigateRoot('/login'); // Redirigir si no hay sesión activa
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      this.nombreCompleto = 'Error al cargar datos'; // Mensaje de error
    } finally {
      await loading.dismiss(); // Aseguramos que el spinner se oculte
    }
  }

  // Ejemplo de cómo podrías tener un botón para cerrar sesión
  async logout() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      duration: 1000
    });
    await loading.present();
    await this.auth.signOut();
    await loading.dismiss();
    this.navCtrl.navigateRoot('/login'); // Redirige al login después de cerrar sesión
  }
}