import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, setDoc, doc, query, orderBy, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth} from '@angular/fire/auth';
import { Publicacion, publicacionConverter } from '../models/publicaciones.model';
import { UserService }  from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor( private _fireStore: Firestore, private auth: Auth, private usuariosService:UserService ) { }
  async create(publicacion: Publicacion): Promise<void> {
    try {
      const publicacionesRef = collection(this._fireStore, "publicaciones");
      await setDoc(doc(publicacionesRef), {
        nombre_publicacion: publicacion.nombre_publicacion,
        comentario: publicacion.comentario,
        archivo: publicacion.archivo,
        fecha_publicacion: publicacion.fecha_publicacion,
        usuario: publicacion.usuario,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getAll(): Promise<Publicacion[]> {
    const publicaciones: Publicacion[] = [];
    const q = query(collection(this._fireStore, "publicaciones"), orderBy("nombre_publicacion")).withConverter(publicacionConverter);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      publicaciones.push(doc.data());
    });
    return publicaciones;
  }

  async getById(publicacionId: string): Promise<Publicacion> {
    const q = doc(this._fireStore, "publicaciones", publicacionId).withConverter(publicacionConverter);
    const querySnapshot = await getDoc(q);
    return querySnapshot.data()!;
  }


}
