import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Auth } from '@angular/fire/auth';
import { ActionSheetController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FotosService } from 'src/app/services/fotos.service';
import { Capacitor } from '@capacitor/core';
import { Firestore } from '@angular/fire/firestore';
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
  FirebaseStorage
} from 'firebase/storage';

@Component({
  selector: 'app-editar-miperfil',
  templateUrl: './editar-miperfil.page.html',
  styleUrls: ['./editar-miperfil.page.scss']
})
export class EditarMiperfilPage implements OnInit {
  profileForm: FormGroup;
  usuarioActual: Usuario | null = null;
  public rutaParaFoto: string = 'assets/icon/user.png';

  constructor(
    private auth: Auth,
    private usuariosService: UserService,
    private formBuilder: FormBuilder,

    private actionSheetController: ActionSheetController,
    private fotosService: FotosService,
    private _fireStore: Firestore,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.profileForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      descripcion: ['', Validators.required]
      // Otros campos del perfil que desees editar
    });
  }

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      this.usuarioActual = await this.usuariosService.getUserData(userId);
      if (this.usuarioActual) {
        this.profileForm.patchValue({
          nombres: this.usuarioActual.nombres,
          apellidos: this.usuarioActual.apellidos,
          descripcion: this.usuarioActual.descripcion

        });
        if (this.usuarioActual.foto) {
          this.rutaParaFoto = this.usuarioActual.foto;
        }
      }
    }
  }
  async guardarCambios() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      try {
        const loading = await this.loadingCtrl.create({
          message: 'Actualizando datos...'
        });
        await loading.present();

        await this.usuariosService.actualizarUsuario(
          this.usuarioActual!.userId,
          formData
        );

        if (this.fotosService.rutaParaArchivo) {
          const downloadURL = await this.uploadFile();
          formData.foto = downloadURL;
          await this.usuariosService.actualizarUsuario(
            this.usuarioActual!.userId,
            formData
          );
        }
        loading.dismiss().then(() => {
          location.reload();
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async capturarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Capturar la foto del cliente',
      buttons: [
        {
          text: 'De galeria de imagenes',
          handler: async () => {
            await this.fotosService.elegirFoto();
            console.log('CAPTURADO');
            this.rutaParaFoto = Capacitor.convertFileSrc(
              this.fotosService.rutaParaArchivo
            );
            console.log('CONVERTIDO' + this.rutaParaFoto);
          }
        },
        {
          text: 'Utilizar la cámara',
          handler: async () => {
            await this.fotosService.obtenerFoto();
            this.rutaParaFoto = Capacitor.convertFileSrc(
              this.fotosService.rutaParaArchivo
            );
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
    console.log('PRESENTADO');
  }



  async uploadFile() {
    const storage: FirebaseStorage = getStorage(this._fireStore.app, this._fireStore.app.options.storageBucket);
    const storageReference = storageRef(storage, 'fotosClientes/' + this.obtenerNombreDeArchivo());

    const blob = await this.fotosService.leerComoBlob(this.rutaParaFoto);
    await uploadBytes(storageReference, blob);

    const downloadURL = await getDownloadURL(storageReference);
    return downloadURL;
  }

  private obtenerNombreDeArchivo() {
    return this.fotosService.rutaParaArchivo.substr(this.fotosService.rutaParaArchivo.lastIndexOf('/') + 1);
  }

  async subirFoto() {
    try {
      // Subir la foto al almacenamiento
      const downloadURL = await this.uploadFile();

      // Actualizar la URL de la foto en el objeto de usuario
      if (this.usuarioActual) {
        this.usuarioActual.foto = downloadURL;

        // Actualizar el usuario en la base de datos
        await this.usuariosService.actualizarUsuario(
          this.usuarioActual.userId,
          this.usuarioActual
        );

        // Mostrar una alerta de éxito
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'La foto se ha subido y los datos se han actualizado correctamente.',
          buttons: ['Aceptar']
        });
        await alert.present();
      } else {
        console.error("No se pudo actualizar la foto debido a que usuarioActual es nulo.");
      }
    } catch (error) {
      // Manejar el error en caso de que falle la subida
      console.error(error);
    }
  }
}