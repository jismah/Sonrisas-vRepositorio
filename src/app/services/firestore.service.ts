import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  // PROCEDIMIENTOS
  public createProcedimiento(data: any) {
    return this.firestore.collection('procedimientos').add(data);
  }

  public getProcedimiento(documentId: string) {
    return this.firestore.collection('procedimientos').doc(documentId).snapshotChanges();
  }

  public getProcedimientos() {
    return this.firestore.collection('procedimientos').snapshotChanges();
  }

  public updateProcedimiento(documentId: string, data: any) {
    return this.firestore.collection('procedimientos').doc(documentId).set(data);
  }

  public deleteProcedimiento(documentId: string) {
    return this.firestore.collection('procedimientos').doc(documentId).delete();
  }

  //Dentistas
  public getDentistas() {
    return this.firestore.collection('dentista').snapshotChanges();
  }

  public getDentista(documentId: string) {
    return this.firestore.collection('dentista').doc(documentId).snapshotChanges();
  }
  //Servicios
  public getServicios() {
    return this.firestore.collection('servicios').snapshotChanges();
  }
  // Citas
  public createCita(data: any) {
    return this.firestore.collection('citas').add(data);
  }

  public getCita(documentId: string) {
    return this.firestore.collection('citas').doc(documentId).snapshotChanges();
  }

  public getCitas() {
    return this.firestore.collection('citas').snapshotChanges();
  }

  public updateCita(documentId: string, data: any) {
    return this.firestore.collection('citas').doc(documentId).set(data);
  }

  public deleteCita(documentId: string) {
    return this.firestore.collection('citas').doc(documentId).delete();
  }


  // Paciente
  public createPaciente(data: any) {
    return this.firestore.collection('pacientes').add(data);
  }

  public getPaciente(documentId: string) {
    return this.firestore.collection('pacientes').doc(documentId).snapshotChanges();
  }

  public getPacientes() {
    return this.firestore.collection('pacientes').snapshotChanges();
  }

  public updatePaciente(documentId: string, data: any) {
    return this.firestore.collection('pacientes').doc(documentId).set(data);
  }

  public deletePaciente(documentId: string) {
    return this.firestore.collection('pacientes').doc(documentId).delete();
  }

  // Gatos (Usuarios)
  // Crea un nuevo gato
  public createCat(data: any) {
    return this.firestore.collection('usuario').add(data);
  }

  // Obtiene un gato
  public getCat(documentId: string) {
    return this.firestore.collection('usuario').doc(documentId).snapshotChanges();
  }

  // Obtiene todos los gatos
  public getCats() {
    return this.firestore.collection('usuario').snapshotChanges();
  }

  // Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('usuario').doc(documentId).set(data);
  }


  // Borra un gato
  public deleteCat(documentId: string) {
    return this.firestore.collection('usuario').doc(documentId).delete();
  }
}
