import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../services/prodotti.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdottiView } from '../models/ProductView';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  showproduct: ProdottiView[] = [];
  prezzototale: number = 0;
  taxamount: number = 0;
  sommafinale: number = 0;
  sendamount: number = 0;
  addressform: boolean = false;
  myform!: FormGroup;
  cartitems: number = 0; // Definizione della proprietà cartitems

  constructor(private prodottiService: ProdottiService) {}

  ngOnInit(): void {
  this.prodottiService.products().subscribe((res: ProdottiView[]) => {
    this.showproduct = res;
    this.showproduct.forEach(item => {
      if (typeof item.immagine === 'string') {
        item.immagine = [item.immagine];
      }
    });
    this.prezzototale = this.prodottiService.calcolareprezzo();
    this.taxamount = this.prezzototale / 100 * 15;
    this.sommafinale = this.prezzototale + this.taxamount;
    this.sendamount = this.sommafinale;
    this.prodottiService.sendfinalamount(this.sendamount);
    this.cartitems = this.prodottiService.getCartItemsCount();
  });
}
  deleteItem(item: ProdottiView) {
    const index = this.showproduct.findIndex(prod => prod._id === item._id);
    if (index !== -1) {
      this.showproduct.splice(index, 1); // Rimuovi l'elemento dall'array showproduct
      // Aggiornamento dei calcoli relativi al prezzo e all'importo finale
      this.prezzototale = this.prodottiService.calcolareprezzo();
      this.taxamount = this.prezzototale / 100 * 15;
      this.sommafinale = this.prezzototale + this.taxamount;
      this.sendamount = this.sommafinale;
      this.prodottiService.sendfinalamount(this.sendamount);
      this.cartitems = this.prodottiService.getCartItemsCount(); // Aggiornamento del numero di elementi nel carrello
    } else {
      console.error("ID del prodotto non definito.");
    }
  }

  // Metodo per gestire l'evento di aggiunta di un prodotto al carrello
 // Metodo per gestire l'evento di aggiunta di un prodotto al carrello

  // Rimozione di tutti gli elementi dal carrello
  Vuoto() {
    this.prodottiService.rimuovituttiglielementi();
    this.cartitems = 0; // Aggiornamento del numero di elementi nel carrello
  }

  // Annulla l'invio del modulo
  cancella() {
    this.addressform = false;
    this.myform.reset();
  }

  // Invia il modulo
  onsubmit() {
    console.log(this.myform.value);
    localStorage.setItem('ecomdata', JSON.stringify(this.myform.value.nome));
  }
  onProdottoAggiunto(data: ProdottiView) {
    this.cartitems = this.prodottiService.getCartItemsCount();
    this.prezzototale = this.prodottiService.calcolareprezzo();
    this.taxamount = this.prezzototale / 100 * 15;
    this.sommafinale = this.prezzototale + this.taxamount;
    this.sendamount = this.sommafinale;
    this.prodottiService.sendfinalamount(this.sendamount);
  }
  
  // Metodo per gestire l'evento di rimozione di un prodotto dal carrello
  onProdottoRimosso(data: ProdottiView) {
    this.cartitems = this.prodottiService.getCartItemsCount();
    this.prezzototale = this.prodottiService.calcolareprezzo();
    this.taxamount = this.prezzototale / 100 * 15;
    this.sommafinale = this.prezzototale + this.taxamount;
    this.sendamount = this.sommafinale;
    this.prodottiService.sendfinalamount(this.sendamount);
  }
}