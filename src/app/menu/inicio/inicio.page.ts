import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/models/publicaciones.model';
import { MispublicacionesService } from 'src/app/services/mispublicaciones.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public publicaciones!: Publicacion[];
  private publicacionesLiked: string[] = []; // Arreglo para almacenar IDs de publicaciones con likes o dislikes

  constructor(
    private publicacionesService: MispublicacionesService
  ) { }

  async ngOnInit() {
    this.publicaciones = await this.publicacionesService.getAll();
  }

  compartir() {
    Share.share({
      title: 'Ve lo que compartí',
      text: 'Unete y registrate ',
      url: 'http://ionicframework.com/'
    });
  }


  darLike(publicacion: Publicacion) {
    this.publicacionesService.darLike(publicacion);
  }
  
  darDislike(publicacion: Publicacion) {
    this.publicacionesService.darDislike(publicacion);
  }

  
}