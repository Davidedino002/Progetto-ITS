import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottiView } from 'src/app/models/ProductView';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-add-prodotti',
  templateUrl: './add-prodotti.component.html',
  styleUrls: ['./add-prodotti.component.scss']
})
export class AddProdottiComponent implements OnInit {

  public prodotti : ProdottiView = {
_id : '',
nome: '',
immagine: [],
prezzo: '',
quantity: '',
info: '',
};
  public isEmptyFields : boolean |undefined;
  constructor(private prodottiService: ProdottiService,
    private router : Router) {} 
  
  
  ngOnInit(): void {
    
  }
  public submitCreateProdotti() {
    if (
      this.prodotti.nome !== '' &&
      this.prodotti.immagine.length > 0 && // Controlla se l'array immagine contiene almeno un elemento
      this.prodotti.prezzo !== '' &&
      this.prodotti.quantity !== '' &&
      this.prodotti.info !== ''
    ) {
      this.prodottiService.createProdotti(this.prodotti).subscribe((data: ProdottiView) => {
        this.router.navigate(['/prodotti/admin']).then();
      });
    } else {
      this.isEmptyFields = true;
    }
  }
 public closeAlert() {
this.isEmptyFields = false;
}
}
