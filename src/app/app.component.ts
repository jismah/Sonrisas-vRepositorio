import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(public authenticationService: AuthenticationService, private spinnerService : NgxSpinnerService) {}



  ngOnInit(){

    this.spinner();

  }

  spinner(): void{
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      
    }, 2000);
  }
}
