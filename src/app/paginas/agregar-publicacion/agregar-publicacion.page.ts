import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Publicacion } from 'src/app/models/publicaciones.model';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-agregar-publicacion',
  templateUrl: './agregar-publicacion.page.html',
  styleUrls: ['./agregar-publicacion.page.scss'],
})
export class AgregarPublicacionPage implements OnInit {

  publicacionForm!: FormGroup;

  fechaFormateada: string = new Date().toISOString(); 

  constructor(
    private formBuilder: FormBuilder,
    private publicacionesService: PublicacionesService,
    private router: Router,
    private alertController: AlertController,
    private auth: Auth,
  ) {}

  ngOnInit() {
    this.publicacionForm = this.formBuilder.group({
      nombre_publicacion: ['', Validators.required],
      comentario: ['', Validators.required],
      archivo: ['']
    });
  }

  async submit() {
    if (this.publicacionForm.invalid || this.publicacionForm.pending) {
      // Manejar la validación del formulario incompleto
      return;
    }

    const usuarioActual = this.auth.currentUser;
    
    console.log('Usuario actual:', usuarioActual);
   
    if (usuarioActual) {
      const publicacion: Publicacion = {
        publicacionId: '', 
        nombre_publicacion: this.publicacionForm.controls['nombre_publicacion'].value,
        comentario: this.publicacionForm.controls['comentario'].value,
        archivo: this.publicacionForm.controls['archivo'].value,
        fecha_publicacion: this.fechaFormateada, 
        usuario: usuarioActual.uid
      };

      await this.publicacionesService.create(publicacion);
    }

  
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de guardar la publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.publicacionForm.reset();
          }
        },
        {
          text: 'OK',
          handler: async () => {
            this.publicacionForm.reset();
            // Redirigir a la página de visualización de todas las publicaciones
            this.router.navigateByUrl('/inicio');
          }
        }
      ]
    });

    await alert.present();
  }
}