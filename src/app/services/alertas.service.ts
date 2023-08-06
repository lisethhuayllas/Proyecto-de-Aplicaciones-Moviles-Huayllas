import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private alertCtrl: AlertController) { }


  async presentAlert(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertCtrl.create({
        header,
        subHeader,
        message,
        buttons
    });
    await alert.present();
}


async presentConfirm(header: string, message: string, successFunction:any) {
  const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
          {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                  console.log('Eliminación cancelada');
              }
          },
          {
              text: 'Aceptar',
              handler: () => {
                  successFunction();
              }
          }
      ]
  });
  await alert.present();
}
}
