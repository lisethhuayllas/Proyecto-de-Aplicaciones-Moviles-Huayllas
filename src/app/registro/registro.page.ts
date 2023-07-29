import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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

  constructor(private userService: UserService, private router: Router,  private alertController: AlertController) {
    this.formReg = new FormGroup({
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.formReg.valid) {
      // Obtén los datos del formulario
      const nuevoUsuario: Usuario = {
        userId: '', // No es necesario proporcionar el ID aquí, ya que Firebase Auth generará uno automáticamente
        nombres: this.formReg.value.nombres,
        apellidos: this.formReg.value.apellidos,
        email: this.formReg.value.email,
        password: this.formReg.value.password,
        usuario: '',
      };

      // Verificar si las contraseñas coinciden
      if (this.formReg.value.password !== this.formReg.value.confirmPassword) {
        this.mostrarAlertaError('Las contraseñas no coinciden.');
        return;
      }

      // Registra al nuevo usuario en Firebase Auth
      this.userService
        .registrarUsuario({ email: nuevoUsuario.email, password: nuevoUsuario.password })
        .then((userCredential) => {
          // El usuario se ha registrado correctamente en Firebase Auth
          const user = userCredential.user;
          // Agrega los datos adicionales del usuario en la colección "usuario" de Firestore
          nuevoUsuario.userId = user.uid; // Asignamos el ID generado por Firebase Auth al objeto de Usuario
          return this.userService.agregarNuevoUsuario(nuevoUsuario);
        })
        .then(response => {
          console.log(response);
          this.router.navigate(['/login']);
        })
        .catch(error => console.log(error));
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