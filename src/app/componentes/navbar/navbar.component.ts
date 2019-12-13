import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) {  }

  signOut() {
    this.authenticationService.SignOut();
  }
  ngOnInit() {
  }

}
