import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private toastr: ToastrService) {  }

  signOut() {
    this.authenticationService.SignOut();
    this.toastr.success('Datos asegurados y guardados', 'Cerraste Sesion!', {
      progressBar: true
    });
  }



  ngOnInit() {
  }

}
