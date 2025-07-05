import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-vermed',
  templateUrl: './vermed.page.html',
  styleUrls: ['./vermed.page.scss'],
  standalone: false,
})
export class VermedPage implements OnInit {
  usuario: string = '';
  nombreCompleto: string = '';
  prescripciones: any[] = [];

  constructor(
    private auth: Auth,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private firebaseService: FirebaseService,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuario = user.email || 'Usuario sin email';
        await this.cargarPrescripciones(user.uid);

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

  async cargarPrescripciones(uid: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando prescripciones...',
    });
    await loading.present();

    try {
      const prescripciones = await this.firebaseService.obtenerPrescripcionesPorUsuario(uid);

      this.prescripciones = prescripciones.map((p: any) => {
        const horaInicio = p.horaInicio || '08:00';
        const frecuencia = Number(p.frecuencia);
        const duracion = Number(p.duracion);
        const horas = this.calcularHorasDosis(horaInicio, frecuencia, duracion);
        const estados = p.estadoDosis || [];

        return {
          ...p,
          id: p.id,
          proxima_dosis: horas[0] || '',
          proxima_dosis_2: horas[1] || '',
          proxima_dosis_3: horas[2] || '',
          estado_dosis_1: estados[0] || 'pendiente',
          estado_dosis_2: estados[1] || 'pendiente',
          estado_dosis_3: estados[2] || 'pendiente'
        };
      });
    } catch (error) {
      console.error('Error al cargar prescripciones:', error);
      this.presentToast('Error al cargar prescripciones', 'danger');
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

  async actualizarEstadoDosis(prescripcion: any, indice: number, nuevoEstado: 'realizada' | 'pendiente') {
    try {
      if (!prescripcion.id) throw new Error('ID de prescripción no disponible');

      await this.firebaseService.actualizarEstadoDosis(prescripcion.id, indice, nuevoEstado);
      prescripcion[`estado_dosis_${indice + 1}`] = nuevoEstado;

      this.presentToast(`Dosis ${indice + 1} marcada como ${nuevoEstado}`, 'success');
    } catch (error) {
      console.error('Error al actualizar estado de dosis:', error);
      this.presentToast('Error al actualizar estado de dosis', 'danger');
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/bienvenida');
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
