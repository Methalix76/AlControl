import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-consulthist',
  templateUrl: './consulthist.page.html',
  styleUrls: ['./consulthist.page.scss'],
  standalone: false,
})
export class ConsulthistPage implements OnInit {
  historial: any[] = [];
  nombreUsuario: string = '';
  nombreCompleto: string = '';
  usuario: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private firebaseService: FirebaseService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuario = user.email || 'Usuario sin email';
        await this.cargarHistorial(user.uid);

        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          this.nombreCompleto = `${userData['nombre']} ${userData['apellido']}`;
        } else {
          this.nombreCompleto = 'Usuario (datos no encontrados)';
        }
      } else {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  async cargarHistorial(uid: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando historial...',
    });
    await loading.present();

    try {
      const prescripciones = await this.firebaseService.obtenerPrescripcionesPorUsuario(uid);

      this.historial = prescripciones
        .map((p: any) => {
          const horaInicio = p.horaInicio || '08:00';
          const frecuencia = Number(p.frecuencia);
          const duracion = Number(p.duracion);
          const estados = p.estadoDosis || [];
          const horas = this.calcularHorasDosis(horaInicio, frecuencia, duracion);

          return horas.map((hora: string, index: number) => ({
            medicamento: p.medicamento,
            diagnostico: p.diagnostico,
            dosis: `${p.cantidad} ${p.presentacion} de ${p.gramaje}`,
            hora,
            estado: estados[index] || 'pendiente'
          }));
        })
        .reduce((acc, val) => acc.concat(val), []);
    } catch (error) {
      console.error('Error al cargar historial:', error);
      this.presentToast('Error al cargar historial', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  calcularHorasDosis(horaInicio: string, frecuencia: number, duracion: number): string[] {
    const [horaStr, minutoStr] = horaInicio.split(':');
    const hora = parseInt(horaStr, 10);
    const minuto = parseInt(minutoStr, 10);

    const fechaInicio = new Date();
    fechaInicio.setHours(hora, minuto, 0, 0);

    const totalDosis = Math.floor((24 / frecuencia) * duracion);
    const horasDosis: string[] = [];

    for (let i = 0; i < totalDosis; i++) {
      const dosis = new Date(fechaInicio.getTime() + i * frecuencia * 60 * 60 * 1000);
      const horaStr = dosis.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      horasDosis.push(horaStr);
    }

    return horasDosis;
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.navigateBack('/bienvenida');
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
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      await loading.dismiss();
      this.presentToast('Error al cerrar sesión', 'danger');
      console.error('Error al cerrar sesión:', error);
    }
  }

}
