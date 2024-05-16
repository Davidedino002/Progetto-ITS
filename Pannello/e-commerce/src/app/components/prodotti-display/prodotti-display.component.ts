import { Component, Input, OnInit } from '@angular/core';
import { ProdottiView } from 'src/app/models/ProductView';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-prodotti-display',
  templateUrl: './prodotti-display.component.html',
  styleUrls: ['./prodotti-display.component.scss']
})
export class ProdottiDisplayComponent implements OnInit {
   
  @Input() cartitems: number = 0;
  public prodotti: ProdottiView[] = [];
  public errorMessage: string | undefined;

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {
    this.prodottiService.getAllProdotti().subscribe((data: ProdottiView[]) => {
      this.prodotti = data;
    }, (error) => {
      this.errorMessage = error;
    });
  }

  aggiungialcarrello(data: ProdottiView) {
    this.prodottiService.aggiungialcarrello(data);
    this.cartitems = this.prodottiService.getCartItemsCount(); 
  }

  rimuoviprodotti(item: ProdottiView) {
    this.prodottiService.rimuoviprodotti(item);
    this.cartitems = this.prodottiService.getCartItemsCount(); 
  }
  
}
