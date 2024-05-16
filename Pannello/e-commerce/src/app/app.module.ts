import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';;
import { HomeComponent } from './components/home/home.component';

import { ProdottiDisplayComponent } from './components/prodotti-display/prodotti-display.component';
import { ProdottiAdminComponent } from './components/prodotti-admin/prodotti-admin.component';
import { AddProdottiComponent } from './components/add-prodotti/add-prodotti.component';
import { EditProdottiComponent } from './components/edit-prodotti/edit-prodotti.component';
import { RegisterService } from './services/register.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderPageComponent } from './order-page/order-page.component'; 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ProdottiDisplayComponent,
    ProdottiAdminComponent,
    AddProdottiComponent,
    EditProdottiComponent,
    RegisterComponent,
    CartPageComponent,
    OrderPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
