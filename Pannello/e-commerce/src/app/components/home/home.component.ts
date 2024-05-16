import { Component } from '@angular/core';
import { ProdottiView } from 'src/app/models/ProductView';
import { ProdottiService } from 'src/app/services/prodotti.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public cartitems: number = 0;
  public mostraprodotti: any = [];
  constructor(private prodottiService: ProdottiService) {} //i prodotti nel carrello devono essere incrementati
  ngOnInit(): void {
    //ogni volta che aggiungiamo prodotti possiamo incrementare il valore del carrello
    this.prodottiService.products().subscribe((res) => {
      this.cartitems = res.length;
      this.mostraprodotti = res;
    }); //i prodotti sono osservabili prendo la risposta e la memorizzo
  }
  delete(item: ProdottiView) {
    this.prodottiService.rimuoviprodotti(item);
  }
  SvuotaCarrello() {
    this.prodottiService.rimuovituttiglielementi();
  }


 }