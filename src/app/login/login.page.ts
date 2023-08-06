import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  showPassword = false;

  constructor
    (
      private userService: UserService,
      private router: Router,
      private alertController: AlertController ) 

    {

    this.formLogin = new FormGroup
    ({
      email: new FormControl('', [Validators.required, Validators.email]), //   Validador para  correo electrónico
      password: new FormControl('', [Validators.required, Validators.minLength(6)]) // Validador para contraseña
    })
    }

  ngOnInit() {
  }


  async onSubmit() {
    if (this.formLogin.valid) {
      const email = this.formLogin.value.email;
      const password = this.formLogin.value.password;
      try {
        const response = await this.userService.loginWithEmailPassword(email, password);
        console.log(response);
        await this.mostrarMensajeBienvenida();
        this.router.navigate(['/about']);
      } catch (error) {
        console.log(error);
        await this.mostrarAlertaError("El correo electrónico o la contraseña son incorrectos.");
      }
    } else {
      await this.mostrarAlertaError("Por favor, completa todos los campos.");
    }
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/about']);
      })
      .catch(error => console.log(error))
  }




  ///        /         ALERTAS   /// 
  async mostrarAlertaError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async mostrarMensajeBienvenida() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Has iniciado sesión correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}