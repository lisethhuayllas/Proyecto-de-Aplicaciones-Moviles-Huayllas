import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Auth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  usuarioActual: Usuario | null = null;

  constructor(
    private auth: Auth,
    private usuariosService: UserService,
    private navCtrl: NavController,
    private router: Router) { }

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      this.usuarioActual = await this.usuariosService.getUserData(userId);
    }
  }


  completarDatos() {
    this.navCtrl.navigateForward('/editar-miperfil'), {
      queryParams: {
        nombres: this.usuarioActual?.nombres,
        apellidos: this.usuarioActual?.apellidos,
        descripcion: this.usuarioActual?.descripcion,
        nacimiento: this.usuarioActual?.nacimiento,
      }
    }
  }

  logout() {
    this.usuariosService.logout()
      .then(() => {

        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        console.log('Error al cerrar sesión:', error);
      });
  }
}