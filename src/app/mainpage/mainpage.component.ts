import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

    
  email: string;
  password: string;

  constructor(
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private firestoreService: FirestoreService
    ) { }
  

    // VARIABLES

    public CitaOnline = [];
    public documentId = null;


    // CITA ONLINE

    public newCitaOnlineForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ARS: new FormControl('', Validators.required),
      fechaSolicitada: new FormControl('', Validators.required),
      horaSolicitada: new FormControl('', Validators.required),
      antecedentes: new FormControl('', Validators.required),
      telContacto: new FormControl('', Validators.required),
      parentesco: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      servicio: new FormControl('', Validators.required),
    });



    public newCitaOnline(form, documentId = this.documentId){

      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        sexo: form.sexo,
        nacimiento: form.nacimiento,
        cedula: form.cedula,
        correo: form.correo,
        telefono: form.telefono,
        ARS: form.ARS,
        fechaSolicitada: form.fechaSolicitada,
        horaSolicitada: form.horaSolicitada,
        antecedentes: form.antecedentes,
        telContacto: form.telContacto,
        parentesco: form.parentesco,
        motivo: form.motivo,
        servicio: form.servicio
      };

      this.firestoreService.createCitaOnline(data).then(() => {

        this.toastr.info('Te enviaremos una respuesta via Correo electronico, sino, acude a nuestro consultorio para tu cita', '', {
          progressBar: true,
          timeOut: 8000
        });

        this.toastr.success('Se ha enviado tu cita online a nuestro consultorio', 'Enviado correctamente', {
          progressBar: true
        });

        
  
        console.log('Cita creada! ✔️');

        this.newCitaOnlineForm.setValue({
          nombre: '',
          apellido: ''
        });
      }, (error) => {
        console.error(error);
        this.toastr.error('Revise los campos ingresados en el formulario', 'Error al enviar!', {
          progressBar: true
        });
      });

    }






  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

  ngOnInit() {
  }

}
