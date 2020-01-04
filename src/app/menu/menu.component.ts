import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(
    private firestoreService: FirestoreService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  // VARIABLES
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

  //FacturaData
  public codDoctor = [];
  public codPaciente = [];
  public Fecha = [];
  public Hora = [];
  public Pieza = [];
  public Procedimientos = [];
  public Precio = 500;


  //PROCEDIMIENTOS
  public newProcedimientoForm = new FormGroup({
    cedula_doctor: new FormControl('', Validators.required),
    cedula_paciente: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    pieza: new FormControl('', Validators.required),
    procedimientos: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  public newProcedimiento(form, documentId = this.documentId) {
    const data = {
      cedula_doctor: form.cedula_doctor,
      cedula_paciente: form.cedula_paciente,
      fecha: form.fecha,
      hora: form.hora,
      pieza: form.pieza,
      procedimientos: form.procedimientos
    };

    this.factura.push([data.cedula_doctor, data.cedula_paciente, data.fecha, data.hora, data.pieza, data.procedimientos]);

    //FacturaData
    this.codDoctor.push(data.cedula_doctor);
    this.codPaciente.push(data.cedula_paciente);
    this.Fecha.push(data.fecha);
    this.Hora.push(data.hora);
    this.Pieza.push(data.pieza);
    this.Procedimientos.push(data.procedimientos);

    console.log(this.factura)


    this.firestoreService.createProcedimiento(data).then(() => {
      console.log('Documento creado exitósamente!');
      this.toastr.success('Se han guardado los datos de los procedimientos exitosamente', 'Guardado!', {
        progressBar: true
      });
      this.newProcedimientoForm.setValue({
        cedula_doctor: '',
        cedula_paciente: '',
        fecha: '',
        hora: '',
        pieza: '',
        procedimientos: '',
        id: ''
      });
    }, (error) => {
      console.error(error);
      this.toastr.error('Revise los campos ingresados en el formulario', 'Error al guardar!', {
        progressBar: true
      });
    });
  }


  //Citas
  public newCitaForm = new FormGroup({
    cedula: new FormControl('', Validators.required),
    dentista: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    motivo: new FormControl('', Validators.required),
    servicio: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  public newCita(form, documentId = this.documentId) {
    const data = {
      cedula: form.cedula,
      dentista: form.dentista,
      fecha: form.fecha,
      hora: form.hora,
      motivo: form.motivo,
      servicio: form.servicio
    };
    this.firestoreService.createCita(data).then(() => {
      console.log('Documento creado exitósamente!');
      this.toastr.success('Se han guardado los datos de la cita exitosamente', 'Guardado!', {
        progressBar: true
      });
      this.newCitaForm.setValue({
        cedula: '',
        dentista: '',
        fecha: '',
        hora: '',
        motivo: '',
        servicio: '',
        id: ''
      });
    }, (error) => {
      console.error(error);
      this.toastr.error('Revise los campos ingresados en el formulario', 'Error al guardar!', {
        progressBar: true
      });
    });
  }


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
      alergiasypadecimientos: form.alergiasypadecimientos,
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

      this.toastr.success('Se han guardado los datos del paciente exitosamente', 'Guardado!', {
        progressBar: true
      });

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
      this.toastr.error('Revise los campos ingresados en el formulario', 'Error al guardar!', {
        progressBar: true
      });
    });
  }




  ngOnInit() {

    //Servicios
    this.firestoreService.getServicios().subscribe((serviciosSnapshot) => {
      this.servicios = [];
      serviciosSnapshot.forEach((servicioData: any) => {
        this.servicios.push({
          id: servicioData.payload.doc.id,
          data: servicioData.payload.doc.data()
        });
      });
    });

    //Citas
    this.firestoreService.getCitas().subscribe((citasSnapshot) => {
      this.citas = [];
      this.dDoctor = [];
      citasSnapshot.forEach((citaData: any) => {
        this.citas.push({
          id: citaData.payload.doc.id,
          data: citaData.payload.doc.data()['dentista'],
          data1: citaData.payload.doc.data()['cedula'],
          data2: citaData.payload.doc.data()['hora'],
          data3: citaData.payload.doc.data()['fecha']
        });
      });
    });

    //Dentistas
    this.firestoreService.getDentistas().subscribe((dentistasSnapshot) => {
      this.dentistas = [];
      dentistasSnapshot.forEach((dentistaData: any) => {
        this.dentistas.push({
          id: dentistaData.payload.doc.id,
          data: dentistaData.payload.doc.data()['nombre'],
          data1: dentistaData.payload.doc.data()['apellido'],
          data2: dentistaData.payload.doc.data()['especialidad']
        });
      });
    });

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
