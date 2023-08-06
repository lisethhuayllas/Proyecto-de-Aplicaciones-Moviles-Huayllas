import { Injectable } from '@angular/core';
import { Publicacion, publicacionConverter } from '../models/publicaciones.model';
import { Firestore, collection, getDocs, setDoc, doc, orderBy, getDoc, deleteDoc, where, query } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth'; // Importa AngularFireAuth


@Injectable({
  providedIn: 'root'
})
export class MispublicacionesService {


  private publicacionesVotadas: { [key: string]: 'like' | 'dislike' } = {};

haVotado(publicacion: Publicacion): boolean {
  return this.publicacionesVotadas.hasOwnProperty(publicacion.publicacionId);
}

  private publicacionesLiked: string[] = [];

  constructor(
    
    private _fireStore: Firestore,
    private auth: Auth,
    
    ) {}

  async create(publicacion: Publicacion): Promise<void> {
    try {
      const publicacionesRef = collection(this._fireStore, "publicaciones");
      await setDoc(doc(publicacionesRef), publicacion);
    } catch (e) {
      console.error(e);
    }
  }

  async getAll(): Promise<Publicacion[]> {
    const publicaciones: Publicacion[] = [];
    const q = query(
      collection(this._fireStore, "publicaciones"),
      orderBy("fecha_publicacion", "desc")
    ).withConverter(publicacionConverter);

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

  async update(publicacion: Publicacion): Promise<void> {
    await setDoc(doc(this._fireStore, "publicaciones", publicacion.publicacionId)
      .withConverter(publicacionConverter), publicacion);
  }

  async darLike(publicacion: Publicacion): Promise<void> {
 
    if (!this.publicacionesLiked.includes(publicacion.publicacionId)) {
      publicacion.likes++;
      this.publicacionesLiked.push(publicacion.publicacionId);
      await this.update(publicacion);
    }
  }

  async darDislike(publicacion: Publicacion): Promise<void> {
 
    if (!this.publicacionesLiked.includes(publicacion.publicacionId)) {
      publicacion.dislikes++;
      this.publicacionesLiked.push(publicacion.publicacionId);
      await this.update(publicacion);
    }
  }

  removerVoto(publicacion: Publicacion) {
    delete this.publicacionesVotadas[publicacion.publicacionId];
    if (publicacion.likes > 0) {
      publicacion.likes--;
    } else if (publicacion.dislikes > 0) {
      publicacion.dislikes--;
    }
    this.update(publicacion);
  }

  async getPublicacionesUsuarioActual(): Promise<Publicacion[]> {
    const user = await this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const publicaciones: Publicacion[] = [];
      const q = query(
        collection(this._fireStore, 'publicaciones'),
        where('usuario', '==', uid), // Filtra por el UID del usuario
        orderBy('fecha_publicacion', 'desc')
      ).withConverter(publicacionConverter);
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        publicaciones.push(doc.data());
      });
  
      return publicaciones;
    } else {
      return []; // No hay usuario actualmente autenticado
    }
  }
}
