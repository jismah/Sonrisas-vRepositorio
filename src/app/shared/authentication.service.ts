import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private toastr: ToastrService) {
    this.userData = angularFireAuth.authState;
   }


    /* Registrar */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Te Registraste Correctamente!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  
  /* Ingresar */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {

        this.toastr.success('Ingresaste al Panel Correctamente', 'Iniciaste Sesion!', {
          progressBar: true
        });

        this.router.navigate(['adminPanel']);
        
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);

        this.toastr.error('Revise los campos ingresados', 'Acceso Denegado!', {
          progressBar: true
        });
      });
  }


  /* Cerrar Sesion */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut()
      .then(res => {
        console.log('Cerraste Sesion');
        this.router.navigate(['']);
      }).catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }  

}
