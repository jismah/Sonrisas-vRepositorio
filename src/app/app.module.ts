import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { ToastrModule } from 'ngx-toastr';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { FirestoreService } from './services/firestore.service';

/* Auth service */
import { AuthenticationService } from './shared/authentication.service';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { DentistasComponent } from './dentistas/dentistas.component';
import { Page404Component } from './page404/page404.component';

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [

  { path: '', component: MainpageComponent, pathMatch: 'full'},
  { path: 'adminPanel', component: MenuComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'dentistas', component: DentistasComponent, pathMatch: 'full' },
  { path: '404pageNotFound', component: Page404Component, pathMatch: 'full' },

  { path: '**', redirectTo: '404pageNotFound', pathMatch: 'full' }
];




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainpageComponent,
    NavbarComponent,
    DentistasComponent,
    Page404Component

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false
    }),
    [RouterModule.forRoot(routes)],
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AngularFirestore,
    FirestoreService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
