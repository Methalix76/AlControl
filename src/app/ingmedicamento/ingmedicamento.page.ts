import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ingmedicamento',
  templateUrl: './ingmedicamento.page.html',
  styleUrls: ['./ingmedicamento.page.scss'],
  standalone: false,
})
export class IngmedicamentoPage implements OnInit {
  
  capturedImage: string | ArrayBuffer | null = null;  /* Variables para imagen */
  diagnostico: string = ''; /* Variables para formulario */
  medicamento: string = '';
  dias: string = '';
  cantidadVeces: string = '';
  horaInicio: string = '';

  
  constructor(
    private auth: Auth,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validar tipo de archivo
      if (!file.type.match('image.*')) {
        this.presentToast('Por favor selecciona una imagen', 'warning');
        return;
      }
      
      // Validar tamaño de archivo (máximo 5MB)
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
    
  async guardarPrescripcion() {
    // Validación de campos obligatorios
    if (!this.diagnostico || !this.medicamento || !this.dias || !this.cantidadVeces || !this.horaInicio) {
      this.presentToast('Por favor complete todos los campos', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando prescripción...',
    });
    await loading.present();

    try {
      // Aquí construirías el objeto con los datos a guardar
      const prescripcion = {
        diagnostico: this.diagnostico,
        medicamento: this.medicamento,
        dias: this.dias,
        cantidadVeces: this.cantidadVeces,
        horaInicio: this.horaInicio,
        imagen: this.capturedImage,
        fechaCreacion: new Date().toISOString()
      };

      // Aquí iría tu lógica para guardar en Firebase o tu backend
      console.log('Datos a guardar:', prescripcion);
      
      // Simulación de tiempo de guardado
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await loading.dismiss();
      this.presentToast('Prescripción guardada exitosamente', 'success');
      
      // Opcional: resetear el formulario
      this.resetForm();
      
      // Opcional: redirigir a otra página
      // this.navCtrl.navigateBack('/bienvenida');
      
    } catch (error) {
      await loading.dismiss();
      this.presentToast('Error al guardar la prescripción', 'danger');
      console.error('Error al guardar:', error);
    }
  }

  resetForm() {
    this.diagnostico = '';
    this.medicamento = '';
    this.dias = '';
    this.cantidadVeces = '';
    this.horaInicio = '';
    this.capturedImage = null;
  }
}