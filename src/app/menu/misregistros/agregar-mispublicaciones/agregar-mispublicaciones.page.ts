import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { FotosService } from 'src/app/services/fotos.service';
import { ActionSheetController, LoadingController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Auth } from '@angular/fire/auth';
import { Publicacion } from 'src/app/models/publicaciones.model';
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Firestore } from '@angular/fire/firestore';
import { MispublicacionesService } from 'src/app/services/mispublicaciones.service';

@Component({
  selector: 'app-agregar-mispublicaciones',
  templateUrl: './agregar-mispublicaciones.page.html',
  styleUrls: ['./agregar-mispublicaciones.page.scss'],
})
export class AgregarMispublicacionesPage implements OnInit {

  private publicacion!: Publicacion;
  public modoDeEdicion = false;
  public publicacionForm!: FormGroup;

  public rutaParaArchivo: string = 'assets/imgs/icon.png'; // Ruta para el archivo adjunto

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private fotosService: FotosService,
    private _fireStore: Firestore,
    private publicacionesService: MispublicacionesService,
    private auth: Auth,
  ) {}

  ngOnInit() {
    this.publicacionForm = this.formBuilder.group({
      nombre_publicacion: ['', Validators.required],
      comentario: ['', Validators.required],
      archivo: ['', Validators.required],
      usuario: [''],
      estado: [''],
      likes: [0], // Agregar campo likes con valor inicial
      dislikes: [0], // Agregar campo dislikes con valor inicial
    });
  }

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id !== '-1') {
      this.publicacion = await this.publicacionesService.getById(id!);
    } else {
      this.publicacion = {
        publicacionId: '',
        nombre_publicacion: '',
        comentario: '',
        archivo: '',
        fecha_publicacion: new Date().toISOString(),
        usuario: '',
        estado: 'publico',
        likes: 0, // Agregar esta propiedad con valor inicial
        dislikes: 0, // Agregar esta propiedad con valor inicial
      };
      this.modoDeEdicion = true;
    }
  
    const userActual = await this.auth.currentUser;
    const usuarioActual = userActual ? userActual.uid : '';
  
    this.publicacionForm = this.formBuilder.group({
      nombre_publicacion: [this.publicacion.nombre_publicacion, Validators.required],
      comentario: [this.publicacion.comentario],
      archivo: [this.publicacion.archivo],
      fecha_publicacion: [this.publicacion.fecha_publicacion],
      usuario: usuarioActual,
      estado: [this.publicacion.estado], // Agregar el campo "estado" al formulario
      likes: [this.publicacion.likes], // Agregar el campo "likes"
      dislikes: [this.publicacion.dislikes], // Agregar el campo "dislikes"
   
    });
  }

  async capturarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Capturar la foto de la publicación',
      buttons: [
        {
          text: 'De galería de imágenes',
          handler: async () => {
            await this.fotosService.elegirFoto();
            this.rutaParaArchivo = Capacitor.convertFileSrc(this.fotosService.rutaParaArchivo);
          },
        },
        {
          text: 'Utilizar la cámara',
          handler: async () => {
            await this.fotosService.obtenerFoto();
            this.rutaParaArchivo = Capacitor.convertFileSrc(this.fotosService.rutaParaArchivo);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
  
    await actionSheet.present();
  }

  async submit() {
    if (this.publicacionForm.invalid || this.publicacionForm.pending) {
      await this.toastService.presentToast('Verifique los datos ingresados', 3000, 'top');
      return;
    }

    this.publicacion.estado = this.publicacionForm.controls['estado'].value;

    const loading = await this.loadingCtrl.create();
    await loading.present();

    const urlArchivoEnviado = await this.uploadArchivo();
    await this.removerFotoLocal();

    if (this.fotosService.rutaParaArchivo !== '') {
      this.publicacionForm.controls['archivo'].setValue(urlArchivoEnviado);
    } else {
      this.publicacionForm.controls['archivo'].setValue('');
    }

    if (this.publicacion.publicacionId === '') {
      await this.publicacionesService.create(this.publicacionForm.value);
    } else {
      await this.publicacionesService.update(this.publicacionForm.value);
    }
    
    loading.dismiss().then(() => {
      this.toastService.presentToast('Guardado exitoso', 3000, 'top');
      this.router.navigateByUrl('/inicio');
    });
  }

  obtenerNombreDeArchivo() {
    return this.fotosService.rutaParaArchivo.substr(this.fotosService.rutaParaArchivo.lastIndexOf('/') + 1);
  }

  async uploadArchivo() {
    const storage: FirebaseStorage = getStorage(this._fireStore.app, this._fireStore.app.options.storageBucket);
    const storageReference = storageRef(storage, "publicacionesArchivos/" + this.obtenerNombreDeArchivo());

    await uploadBytes(storageReference, await this.fotosService.leerComoBlob(this.rutaParaArchivo));
    return await getDownloadURL(storageReference);
  }

  async removerFotoLocal() {
    if (this.fotosService.rutaParaArchivo !== '') {
      await Filesystem.deleteFile({
        path: this.obtenerNombreDeArchivo(),
        directory: Directory.Data,
      });
    }
  }

  iniciarEdicion() {
    this.modoDeEdicion = true;
  }

  cancelarEdicion() {
    this.modoDeEdicion = false;
  }
}