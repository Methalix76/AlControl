import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth'; // aqui!
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // aqui!
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-a-testeo',
  templateUrl: './a-testeo.page.html',
  styleUrls: ['./a-testeo.page.scss'],
  standalone: false,
})
export class ATesteoPage implements OnInit {

  diagnosticoSeleccionado: string = '';
  medicamentoSeleccionado: string = '';
  diagnosticos: { codigo: string, nombre: string }[] = [];
  medicamentos: { nombre: string, comercial: string, gramaje: string }[] = [];
  private dataJson: any[] = [];
  gramajeSeleccionado: string = '';
  gramajes: string[] = [];
  cantidadSeleccionada: string = '';
  presentacionSeleccionada: string = '';
  cantidades: string[] = [];
  presentaciones: string[] = [];
  frecuenciaHoras: number | null = null;
  duracionDias: number | null = null;
  horaInicio: number | null = null;
  minutoInicio: number | null = null;

  private dosisJson: any[] = [];
  private http = inject(HttpClient);

  constructor(
    private auth: Auth, // aqui!
    private firestore: Firestore, // aqui!
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    this.cargarDiagnosticos();
    this.cargarDosis();
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

  async guardarPrescripcion() {
    if (!this.diagnosticoSeleccionado || !this.medicamentoSeleccionado || !this.gramajeSeleccionado ||
        !this.cantidadSeleccionada || !this.presentacionSeleccionada ||
        this.frecuenciaHoras === null || this.duracionDias === null) {
      this.presentToast('Debe completar todos los campos', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando prescripción...',
      duration: 3000,
      spinner: 'circles',
    });
    await loading.present();

    try {
      const user = this.auth.currentUser; // aqui!
      if (!user) throw new Error('Usuario no autenticado'); // aqui!

      const prescripcion = { // aqui!
        diagnostico: this.diagnosticoSeleccionado,
        medicamento: this.medicamentoSeleccionado,
        gramaje: this.gramajeSeleccionado,
        cantidad: this.cantidadSeleccionada,
        presentacion: this.presentacionSeleccionada,
        frecuencia: this.frecuenciaHoras,
        duracion: this.duracionDias,
        uid: user.uid // aqui!
      };

      const prescripcionesRef = collection(this.firestore, 'prescripciones'); // aqui!
      await addDoc(prescripcionesRef, prescripcion); // aqui!

      this.presentToast('Prescripción guardada correctamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      this.presentToast('Error al guardar prescripción', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  cargarDiagnosticos() {
    this.http.get<any>('assets/Diagnostico.json').subscribe(data => {
      this.dataJson = data.Diagnostico;
      const lista = this.dataJson.map((item: any) => item.Diagnostico);
      const unicos = [...new Set(lista)];
      this.diagnosticos = unicos.map(d => ({ codigo: d, nombre: d }));
    });
  }

  cargarDosis() {
    this.http.get<any>('assets/Dosis.json').subscribe(data => {
      this.dosisJson = data.Dosis;
      const cantidadesUnicas = [...new Set(this.dosisJson.map((d: any) => d.Cantidad))];
      this.cantidades = cantidadesUnicas;
    });
  }

  onDiagnosticoChange() {
    this.medicamentoSeleccionado = '';
    this.gramajeSeleccionado = '';
    this.gramajes = [];
    this.cantidadSeleccionada = '';
    this.presentacionSeleccionada = '';
    this.presentaciones = [];
    this.frecuenciaHoras = null;
    this.duracionDias = null;
    this.medicamentos = this.dataJson
      .filter(item => item.Diagnostico === this.diagnosticoSeleccionado)
      .map(item => ({
        nombre: item['Nombre Medicamento'],
        comercial: item['Nombre comercial'],
        gramaje: item['gramaje']
      }))
      .filter((value, index, self) =>
        index === self.findIndex(v => v.nombre === value.nombre)
      );
  }

  onMedicamentoChange() {
    this.gramajeSeleccionado = '';
    this.gramajes = this.dataJson
      .filter(item =>
        item.Diagnostico === this.diagnosticoSeleccionado &&
        item['Nombre Medicamento'] === this.medicamentoSeleccionado
      )
      .map(item => item['gramaje']);
  }

  onGramajeChange() {
    this.cantidadSeleccionada = '';
    this.presentacionSeleccionada = '';
    this.presentaciones = [];
    this.frecuenciaHoras = null;
    this.duracionDias = null;
  }

  onCantidadChange() {
    this.presentacionSeleccionada = '';
    this.presentaciones = this.dosisJson
      .filter(d => d.Cantidad === this.cantidadSeleccionada)
      .map(d => d.presentacion);
  }

  onFrecuenciaInput() {
    if (!this.frecuenciaHoras || this.frecuenciaHoras <= 0) {
      this.duracionDias = null;
    }
  }



  // NUEVO: Método para manejar la selección de imagen
   /*  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          this.capturedImage = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
  } */
}