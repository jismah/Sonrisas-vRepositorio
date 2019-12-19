import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
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
        console.log('Iniciaste Sesion!');
        this.router.navigate(['adminPanel']);
        
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
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
