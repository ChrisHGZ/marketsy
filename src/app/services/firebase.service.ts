import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, query} from "firebase/firestore";
import { collectionData } from 'rxfire/firestore';
import {AngularFireStorage}  from '@angular/fire/compat/storage';
import { UtilsService } from './utils.service';
import {getStorage, uploadString, ref, getDownloadURL} from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);
  storage = inject(AngularFireStorage);
  // =======Autenticacion

  getAuth() {
    return getAuth();
  }

  // =======Acceder======

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  register(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }


  // =======Base de datos======

  //setear documento
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data)
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  signOut() {
    getAuth().signOut();
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data)
  }

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(),path),data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(),path))
    })
  }
  //obtener documentos
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery),{ idField: 'id' });

  }


}