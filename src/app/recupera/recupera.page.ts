import { Component } from '@angular/core'; // Ya no es necesario OnInit si no lo usas explícitamente
import { NavController, LoadingController, AlertController } from '@ionic/angular'; // Importa LoadingController y AlertController
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth'; // Importa Auth y sendPasswordResetEmail

@Component({
  selector: 'app-recupera',
  standalone: false,
  templateUrl: './recupera.page.html',
  styleUrls: ['./recupera.page.scss'],
})
export class RecuperaPage {
  mail: string = ''; // Variable para el correo electrónico ingresado por el usuario

  constructor(
    private navCtrl: NavController,
    private auth: Auth, // Inyecta el servicio de autenticación de Firebase
    private loadingController: LoadingController, // Inyecta LoadingController
    private alertCtrl: AlertController // Inyecta AlertController
  ) {}

  goBack() {
    this.navCtrl.navigateBack('/login'); // Es más común volver al login desde la recuperación
  }

  async pruebaClickRecuppass() {
    console.log('Botón btnRecuppass clickeado. Correo:', this.mail);

    // 1. Validar que el correo no esté vacío
    if (!this.mail) {
      this.showAlert('Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    // 2. Mostrar un indicador de carga
    const loading = await this.loadingController.create({
      message: 'Enviando correo de recuperación...',
    });
    await loading.present();

    try {
      // 3. Llamar al método de Firebase para enviar el correo de restablecimiento
      await sendPasswordResetEmail(this.auth, this.mail);

      await loading.dismiss(); // Ocultar el spinner

      // 4. Mostrar un mensaje de éxito al usuario
      this.showAlert(
        'Correo Enviado',
        'Se ha enviado un correo electrónico a tu dirección para restablecer tu contraseña. Revisa tu bandeja de entrada y spam.'
      );

      // Opcional: Puedes navegar de vuelta a la página de login después de enviar el correo
      this.navCtrl.navigateBack('/login');

    } catch (error: any) {
      await loading.dismiss(); // Ocultar el spinner
      console.error('Error al enviar correo de recuperación:', error);

      let errorMessage = 'Ocurrió un error inesperado al enviar el correo de recuperación.';

      // Manejo de errores comunes de Firebase Authentication
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico es inválido.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No existe un usuario con este correo electrónico.';
            // Nota: Por seguridad, Firebase puede devolver este mismo error
            // incluso si el correo no existe, para evitar la enumeración de usuarios.
            // El mensaje genérico de "correo enviado si existe" es mejor UX.
            break;
          case 'auth/missing-email':
            errorMessage = 'El campo de correo electrónico está vacío.';
            break;
          // Puedes añadir más casos de error si los encuentras en tu testing
        }
      }
      this.showAlert('Error', errorMessage);
    }
  }

  // Función de utilidad para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}