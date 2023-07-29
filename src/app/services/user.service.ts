import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updateProfile } from '@angular/fire/auth';
import { Firestore, collection, getDocs, setDoc, doc, query, orderBy, getDoc, deleteDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { Usuario } from '../models/usuarios.model';   //Modelo de USUARIOS


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private auth: Auth,
    public firestore: Firestore,
  ) { }


  //Para registrar usuariooo
  registrarUsuario({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  async agregarNuevoUsuario(user: Usuario) {
    try {
      const usuariosRef = collection(this.firestore, "usuario");
      await setDoc(doc(usuariosRef, user.userId), user);
    } catch (e) {
      console.error(e);
    }
  }



  //Para iniciar sesión
  async loginWithEmailPassword(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(this.firestore, 'usuario', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
      
        const userData = userDocSnapshot.data();

        return { user, userData };
      } else {
        return { user };
      }
    } catch (error) {
      throw error;
    }
  }
  

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  async getUserData(userId: string): Promise<Usuario | null> {
    try {
      const userDocRef = doc(this.firestore, 'usuario', userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as Usuario;
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  
  async getUsuarioById(userId: string): Promise<Usuario | null> {
    try {
      const usuarioDocRef = doc(this.firestore, "usuario", userId);
      const usuarioDocSnap = await getDoc(usuarioDocRef);
      
      if (usuarioDocSnap.exists()) {
        return usuarioDocSnap.data() as Usuario;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

}