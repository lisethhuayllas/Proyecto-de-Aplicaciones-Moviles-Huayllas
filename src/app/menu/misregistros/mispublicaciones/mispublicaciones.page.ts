import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { UserService } from 'src/app/services/user.service';

import { MispublicacionesService } from 'src/app/services/mispublicaciones.service';
import { Publicacion } from 'src/app/models/publicaciones.model';


@Component({
  selector: 'app-mispublicaciones',
  templateUrl: './mispublicaciones.page.html',
  styleUrls: ['./mispublicaciones.page.scss'],
})
export class MispublicacionesPage implements OnInit {

  public publicaciones!: Publicacion[];

  @ViewChild('slidingList') slidingList!: IonList;

  constructor(
    private publicacionesService: MispublicacionesService,
  ) { }

  async ngOnInit() {
    this.publicaciones = await this.publicacionesService.getAll();
  }

  rutaArchivoParaListado(archivo: string) {
    if (archivo !== '') {
      return Capacitor.convertFileSrc(archivo);
    } else {
      return 'assets/imgs/icon.png';
    }
  }


}
