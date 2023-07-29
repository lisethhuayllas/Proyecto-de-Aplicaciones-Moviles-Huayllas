import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Publicacion } from 'src/app/models/publicaciones.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  public publicaciones!: Publicacion[];

  constructor(private publicacionesService: PublicacionesService, private usuariosService: UserService,     private router: Router,) { }

  async ngOnInit() {
    this.publicaciones = await this.publicacionesService.getAll();
    await this.setNombreUsuarioEnPublicaciones();
  }

  async setNombreUsuarioEnPublicaciones() {
    for (const publicacion of this.publicaciones) {
      const usuario = await this.usuariosService.getUsuarioById(publicacion.usuario);
      if (usuario) {
        publicacion.nombre_usuario = `${usuario.nombres} ${usuario.apellidos}`;
      } else {
        publicacion.nombre_usuario = 'Usuario Desconocido';
      }
    }
  }

  logout() {
    this.usuariosService.logout()
      .then(() => {
        // Redirigir a la página de inicio de sesión (o a donde desees)
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        console.log('Error al cerrar sesión:', error);
      });
  }
}
