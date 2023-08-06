import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../models/usuarios.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formReg: FormGroup;
  showPassword = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.formReg = new FormGroup({
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.formReg.valid) {
      // Obtén los datos del formulario
      const nuevoUsuario: Usuario = {
        userId: '', // Firebase Auth generará idddd
        nombres: this.formReg.value.nombres,
        apellidos: this.formReg.value.apellidos,
        email: this.formReg.value.email,
        password: this.formReg.value.password,
        descripcion: 'Aún no tienes descripción',
        foto: '', //
        nacimiento: new Date()
      };

      // Verificar si las contraseñas coinciden
      if (this.formReg.value.password !== this.formReg.value.confirmPassword) {
        this.mostrarAlertaError('Las contraseñas no coinciden.');
        return;
      }

      // Verificar si el correo electrónico ya está registrado
      const existingUser = await this.userService.getUserDataByEmail(nuevoUsuario.email);
      if (existingUser) {
        this.mostrarAlertaError('El correo electrónico ya está registrado.');
        return;
      }

      // Registra al nuevo usuario en Firebase Auth
      try {
        const userCredential = await this.userService.registrarUsuario({
          email: nuevoUsuario.email,
          password: nuevoUsuario.password,
        });

        // El usuario se ha registrado correctamente en Firebase Auth
        const user = userCredential.user;

       
        nuevoUsuario.userId = user.uid; 
        await this.userService.agregarNuevoUsuario(nuevoUsuario);

        this.router.navigate(['/login']);
      } catch (error) {
        console.error(error);
        this.mostrarAlertaError('Ha ocurrido un error durante el registro.');
      }
    } else {
      this.mostrarAlertaError('Por favor, completa todos los campos.');
    }
  }

  async mostrarAlertaError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de registro',
      message: message,
      buttons: ['OK'],
      animated: false,
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}