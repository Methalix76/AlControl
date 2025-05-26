import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular'; // Añade AlertController
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'; // Importa Auth y su método de inicio de sesión

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  mail: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private auth: Auth, // Inyecta el servicio de Autenticación de Firebase
    private alertCtrl: AlertController // Inyecta el AlertController
  ) {}

  async pruebaClickValidacion() {
    console.log('Botón btnValidacion clickeado');

    // 1. Validaciones
    if (!this.mail || !this.contrasena) {
      this.showAlert('Error de Validación', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // 2. muestra indicador de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      // duration: 750 // Quita la duración fija, el spinner se cerrará al éxito o error
    });
    await loading.present();

    try {
      // 3. iniciar sesión con Firebase 
      const userCredential = await signInWithEmailAndPassword(this.auth, this.mail, this.contrasena);
      const user = userCredential.user;

      await loading.dismiss(); // Ocultar el spinner

      if (user) {
        // 4. Si la autenticación es exitosa, pasa a la sigueinte pagina
        this.showAlert('Inicio de Sesión Exitoso', `¡Bienvenido, ${user.email}!`);
        this.navCtrl.navigateForward('/bienvenida'); 
      } else {
        throw new Error('No se pudo obtener el usuario después del inicio de sesión.');
      }

    } catch (error: any) {
      await loading.dismiss(); // Ocultar el spinner
      console.error('Error al iniciar sesión:', error);

      let errorMessage = 'Ocurrió un error inesperado al iniciar sesión.';

      // Manejo de errores comunes de Firebase Authentication
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico es inválido.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Tu cuenta ha sido deshabilitada.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No existe una cuenta con este correo electrónico.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta.';
            break;
          case 'auth/invalid-credential': // Para errores más genéricos de credenciales
            errorMessage = 'Credenciales inválidas. Verifica tu correo y contraseña.';
            break;
          // Agrega más casos de error según sea necesario
        }
      }
      this.showAlert('Error de Inicio de Sesión', errorMessage);
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/');
  }

  navigateToRecupera() {
    this.navCtrl.navigateForward(['/recupera']);
  }

  // Función de utilidad para mostrar alertas (si no la tienes ya en RegisterPage y quieres centralizarla)
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
