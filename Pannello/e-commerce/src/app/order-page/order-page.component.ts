import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent {
  public totalmount: number = 0;
  public grandtotal: number= 0;
  //variabile dati utente 
  public userdata:any;
  //variabile username
  public username:any;
  constructor(private prodottiService : ProdottiService, private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
      //funzione per rimuovere tutti gli elementi dal carrello una volta acquistato
      this.prodottiService.rimuovituttiglielementi();
    }, 4000);
    this.totalmount = this.prodottiService.calcolareprezzo();
    //importo totale dell'Api da calcolare
    //ricevi somma
    this.grandtotal = this.prodottiService.riceviimportofinale();
     //ottenere l'archiviazione locale degli articoli
  let localdata = localStorage.getItem('ecomdata');
  this.userdata = localdata;
  this.username = JSON.parse(this.userdata);
  }
}
