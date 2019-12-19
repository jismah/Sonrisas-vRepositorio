import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(
    private firestoreService: FirestoreService,
    public authenticationService: AuthenticationService
  ) {  }


  public documentId = null;
  public pacientes = [];
  public citas = [];
  public servicios = [];
  public dentistas = [];
  public currentStatus = 1;
  public dDoctor = null;
  public dPaciente = null;
  public paciente = [];
  public pNombre = [];
  public pApellido = [];
  public dNombre = [];
  public dApellido = [];
  public factura = [];


  //Pacientes
  public newPacienteForm = new FormGroup({
    alergiasypadecimientos: new FormControl('', Validators.required),
    antecedentes: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    nota: new FormControl('', Validators.required),
    parentesco: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  public newPaciente(form, documentId = this.documentId) {
      const data = {
        alergiasypadecimientos: form.antecedentes,
        antecedentes: form.antecedentes,
        apellido: form.apellido,
        cedula: form.cedula,
        contacto: form.contacto,
        direccion: form.direccion,
        fecha_nacimiento: form.fecha_nacimiento,
        mail: form.mail,
        nombre: form.nombre,
        nota: form.nota,
        parentesco: form.parentesco,
        sexo: form.sexo,
        telefono: form.telefono
      };
      this.firestoreService.createPaciente(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newPacienteForm.setValue({
          alergiasypadecimientos: '',
          antecedentes: '',
          apellido: '',
          cedula: '',
          contacto: '',
          direccion: '',
          fecha_nacimiento: '',
          mail: '',
          nombre: '',
          nota: '',
          parentesco: '',
          sexo: '',
          telefono: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
  }

  

  
  ngOnInit() {

     //Pacientes
     this.newPacienteForm.setValue({
      alergiasypadecimientos: '',
      antecedentes: '',
      apellido: '',
      cedula: '',
      contacto: '',
      direccion: '',
      fecha_nacimiento: '',
      mail: '',
      nombre: '',
      nota: '',
      parentesco: '',
      sexo: '',
      telefono: '',
      id: ''
    });
    this.firestoreService.getPacientes().subscribe((pacientesSnapshot) => {
      this.pacientes = [];
      pacientesSnapshot.forEach((pacienteData: any) => {
        this.pacientes.push({
          id: pacienteData.payload.doc.id,
          data: pacienteData.payload.doc.data()["nombre"],
          data1: pacienteData.payload.doc.data()["apellido"],
        });
      });
    });
    
  }

}
