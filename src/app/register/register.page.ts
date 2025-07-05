import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombre: string = '';
  apellido: string = '';
  run: string = '';
  mail: string = '';
  pass: string = '';
  repass: string = '';
  tipoUsuario: string = ''; 

  constructor(
    private navCtrl: NavController,
    private auth: Auth,
    private firestore: Firestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  goBack() {
    this.navCtrl.navigateBack('/');
  }

  // Si este botón es para navegar al login después de un registro exitoso, o si es un botón de login previo
  pruebaClickLogin() {
    console.log('Botón de Login clickeado (quizás para navegar a la página de login)');
    this.navCtrl.navigateForward('/home'); // O a tu página de login
  }

  async pruebaClickGuardarRegistro() {
    console.log('Botón Registrarse clickeado');

    // 1. Validaciones básicas (puedes expandirlas mucho más)
    if (!this.nombre || !this.apellido || !this.run || !this.mail || !this.pass || !this.repass || !this.tipoUsuario) {
      this.showAlert('Error de Validación', 'Por favor, completa todos los campos, incluyendo el tipo de usuario.');
      return;
    }

    if (this.pass !== this.repass) {
      this.showAlert('Error de Contraseña', 'Las contraseñas no coinciden.');
      return;
    }

    // 2. Mostrar un indicador de carga
    const loading = await this.loadingCtrl.create({
      message: 'Registrando usuario...',
    });
    await loading.present();

    try {
      // 3. Registrar usuario con Email y Contraseña en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.mail, this.pass);
      const user = userCredential.user;

      // 4. Guardar datos adicionales del usuario en Firestore
      if (user) {
        const usersCollection = collection(this.firestore, 'users'); 
        await setDoc(doc(usersCollection, user.uid), {  
          apellido: this.apellido,
          run: this.run,
          email: this.mail,
          tipoUsuario: this.tipoUsuario, 
          createdAt: new Date().toISOString() 
        });

        await loading.dismiss(); 
        this.showAlert('¡Registro Exitoso!', 'Tu cuenta ha sido creada y tus datos guardados.');
        this.navCtrl.navigateForward('/home');  
      } else {
        throw new Error('No se pudo obtener el usuario después del registro.');
      }

    } catch (error: any) {
      await loading.dismiss(); 
      console.error('Error al registrar o guardar datos:', error);
      let errorMessage = 'Ocurrió un error inesperado al registrarte.';

      
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Este correo electrónico ya está registrado.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico es inválido.';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
            break;
  
        }
      }
      this.showAlert('Error de Registro', errorMessage);
    }
  }

  // utilidad para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}