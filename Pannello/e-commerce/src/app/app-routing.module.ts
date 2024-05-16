import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProdottiDisplayComponent } from './components/prodotti-display/prodotti-display.component';
import { ProdottiAdminComponent } from './components/prodotti-admin/prodotti-admin.component';
import { AddProdottiComponent } from './components/add-prodotti/add-prodotti.component';
import { EditProdottiComponent } from './components/edit-prodotti/edit-prodotti.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderPageComponent } from './order-page/order-page.component';




export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component : LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'prodotti/display', component: ProdottiDisplayComponent, data: { label: 'prodotti/display' }},
  {path: 'prodotti/admin', component: ProdottiAdminComponent, data: { label: 'prodotti/admin' }},
  {path: 'prodotti/add', component: AddProdottiComponent,data: { label: 'prodotti/add' }},
  {path: 'edit/prodotti/:id', component : EditProdottiComponent,data: { label: 'edit/prodotti/:id'}},
  { path: 'carrello/prodotti', component: CartPageComponent,data: { label: 'carrello/prodotti'}},
  {path: 'order-page', component:OrderPageComponent,data: { label: 'order-page'}},
  {path: 'home', component: HomeComponent,
   children:[
     {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component : HomeComponent, data: { label: 'home' }},
     {path: 'prodotti/display', component: ProdottiDisplayComponent, data: { label: 'prodotti/display' }},
     {path: 'prodotti/admin', component: ProdottiAdminComponent, data: { label: 'prodotti/admin' }},
     { path: 'carrello/prodotti', component: CartPageComponent,data: { label: 'carrello/prodotti'}},
     {path: 'order-page', component:OrderPageComponent,data: { label: 'order-page'}},
     {path: 'prodotti/add', component: AddProdottiComponent,data:{ label: 'prodotti/add'}},
     {path: 'edit/prodotti/:id', component : EditProdottiComponent,data:{ label: 'edit/prodotti/:id'}},
   ]
  },
 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
