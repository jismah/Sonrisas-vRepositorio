import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dentistas',
  templateUrl: './dentistas.component.html',
  styleUrls: ['./dentistas.component.css']
})
export class DentistasComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private firestoreService: FirestoreService
  ) { }



      // VARIABLES

      public Dentista = [];
      public documentId = null;


      
    // CITA ONLINE

    public newDentistaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      especialidad: new FormControl('', Validators.required),
      });


    public newDentista(form, documentId = this.documentId){

      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        cedula: form.cedula,
        telefono: form.telefono,
        especialidad: form.especialidad,
      };

      this.firestoreService.createDentista(data).then(() => {


        this.toastr.success('Se ha guardado un nuevo Dentista', 'Guardado correctamente', {
          progressBar: true
        });

        
  
        console.log('Dentista creado! ✔️');

        this.newDentistaForm.setValue({
          nombre: '',
          apellido: '',
          cedula: '',
          telefono: '',
          especialidad: ''
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



  

  ngOnInit() {
  }

}
