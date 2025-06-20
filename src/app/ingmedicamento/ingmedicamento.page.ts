// ingmedicamento.page.ts
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { MedicamentoService } from '../services/medicamento.service';

@Component({
  selector: 'app-ingmedicamento',
  templateUrl: './ingmedicamento.page.html',
  styleUrls: ['./ingmedicamento.page.scss'],
  standalone:false,
})
export class IngmedicamentoPage implements OnInit {
  capturedImage: string | ArrayBuffer | null = null;
  diagnostico: string = '';
  medicamento: string = '';
  dias: string = '';
  cantidadVeces: string = '';
  horaInicio: string = '';
  
  diagnosticos: string[] = [];
  medicamentos: any[] = [];
  presentaciones: string[] = ['Cápsula(s)', 'Tableta(s)', 'Jarabe', 'Otra'];
  frecuencias: number[] = [1, 2, 3, 4, 6, 8, 12];
  duraciones: number[] = [1, 2, 3, 5, 7, 10, 15, 30];
  
  cantidad: string = '1';
  presentacion: string = 'Tableta(s)';
  frecuencia: string = '8';
  duracion: string = '7';
  nuevoDiagnostico: string = '';
  mostrarInputDiagnostico: boolean = false;
  nuevoMedicamento: string = '';
  mostrarInputMedicamento: boolean = false;

  constructor(
    private auth: Auth,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private medicamentoService: MedicamentoService
  ) { }

  ngOnInit() {
    this.cargarDiagnosticos();
  }

  // Método para navegar atrás
  goBack() {
    this.navCtrl.navigateBack('/bienvenida');
  }

  // Método para mostrar toasts
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  // Método para cerrar sesión
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

  // Método para manejar la selección de archivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      if (!file.type.match('image.*')) {
        this.presentToast('Por favor selecciona una imagen', 'warning');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        this.presentToast('Imagen es muy grande (máx. 5MB)', 'warning');
        return;
      }

      const reader = new FileReader();
      
      reader.onload = () => {
        this.capturedImage = reader.result;
        this.presentToast('Imagen cargada correctamente', 'success');
      };
      
      reader.onerror = (error) => {
        console.error('Error al leer archivo:', error);
        this.presentToast('Error al cargar la imagen', 'danger');
      };
      
      reader.readAsDataURL(file);
    }
  }

  cargarDiagnosticos() {
    this.diagnosticos = this.medicamentoService.getDiagnosticos();
  }

  onDiagnosticoChange(event: any) {
    this.diagnostico = event.detail.value;
    if (this.diagnostico === 'nuevo') {
      this.mostrarInputDiagnostico = true;
    } else {
      this.mostrarInputDiagnostico = false;
      this.cargarMedicamentosPorDiagnostico();
    }
  }

  cargarMedicamentosPorDiagnostico() {
    this.medicamentos = this.medicamentoService.getMedicamentosByDiagnostico(this.diagnostico);
  }

  onMedicamentoChange(event: any) {
    this.medicamento = event.detail.value;
    if (this.medicamento === 'nuevo') {
      this.mostrarInputMedicamento = true;
    } else {
      this.mostrarInputMedicamento = false;
    }
  }

  async guardarNuevoDiagnostico() {
    if (!this.nuevoDiagnostico) {
      await this.presentToast('Por favor ingrese un diagnóstico', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando nuevo diagnóstico...',
    });
    await loading.present();

    try {
      await this.medicamentoService.addNuevoDiagnostico(this.nuevoDiagnostico);
      this.diagnostico = this.nuevoDiagnostico;
      this.diagnosticos.push(this.nuevoDiagnostico);
      this.mostrarInputDiagnostico = false;
      this.nuevoDiagnostico = '';
      await loading.dismiss();
      await this.presentToast('Diagnóstico guardado correctamente', 'success');
    } catch (error) {
      await loading.dismiss();
      await this.presentToast('Error al guardar el diagnóstico', 'danger');
      console.error('Error:', error);
    }
  }

  async guardarPrescripcion() {
    if (!this.diagnostico || !this.medicamento || !this.duracion || !this.frecuencia || !this.horaInicio) {
      await this.presentToast('Por favor complete todos los campos', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando prescripción...',
    });
    await loading.present();

    try {
      const prescripcion = {
        diagnostico: this.diagnostico,
        medicamento: this.medicamento,
        cantidad: this.cantidad,
        presentacion: this.presentacion,
        frecuencia: this.frecuencia,
        duracion: this.duracion,
        horaInicio: this.horaInicio,
        imagen: this.capturedImage,
        fechaCreacion: new Date().toISOString(),
        usuarioId: this.auth.currentUser?.uid
      };

      await this.medicamentoService.guardarPrescripcion(prescripcion);
      
      await loading.dismiss();
      await this.presentToast('Prescripción guardada exitosamente', 'success');
      this.resetForm();
      
    } catch (error) {
      await loading.dismiss();
      await this.presentToast('Error al guardar la prescripción', 'danger');
      console.error('Error al guardar:', error);
    }
  }

  resetForm() {
    this.diagnostico = '';
    this.medicamento = '';
    this.cantidad = '1';
    this.presentacion = 'Tableta(s)';
    this.frecuencia = '8';
    this.duracion = '7';
    this.horaInicio = '';
    this.capturedImage = null;
    this.mostrarInputDiagnostico = false;
    this.mostrarInputMedicamento = false;
    this.nuevoDiagnostico = '';
    this.nuevoMedicamento = '';
  }
}