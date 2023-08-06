import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhotos, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  public rutaParaArchivo: string = '';

  constructor() { }

  async obtenerFoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
      quality: 100,
    });

    await this._grabarFoto(capturedPhoto.webPath!);
  }

  async elegirFoto() {
    const pickedPhoto: GalleryPhotos = await Camera.pickImages({
      quality: 100,
      limit: 1
    });

    await this._grabarFoto(pickedPhoto.photos[0].webPath);
  }

  async leerComoBlob(ruta: string) {
    const response = await fetch(ruta);
    return await response.blob();
  }

  private _crearNombreArchivoImagen() {
    const d = new Date(),
      t = d.getTime(),
      nuevoNombreArchivo = t + '.jpg';
    return nuevoNombreArchivo;
  }

  private async _grabarFoto(caminho: string) {
    const nombreDeArchivo = this._crearNombreArchivoImagen();
    const datosEnBase64 = await this._leerComoBase64(caminho);

    const archivoGrabado = await Filesystem.writeFile({
      path: nombreDeArchivo,
      data: datosEnBase64,
      directory: Directory.Data
    });

    this.rutaParaArchivo = archivoGrabado.uri;
  }

  private async _leerComoBase64(caminho: string) {
    const response = await fetch(caminho);
    const blob = await response.blob();

    return await this._converterBlobParaBase64(blob) as string;
  }

  _converterBlobParaBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
