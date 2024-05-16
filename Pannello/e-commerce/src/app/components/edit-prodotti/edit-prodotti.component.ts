import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProdottiView } from 'src/app/models/ProductView';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-edit-prodotti',
  templateUrl: './edit-prodotti.component.html',
  styleUrls: ['./edit-prodotti.component.scss']
})
export class EditProdottiComponent implements OnInit {
public prodottiId : string | null = '';
public selectedProdotti : ProdottiView = {} as ProdottiView;
public errorMessage : string |undefined;
public isEmptyFields : boolean |undefined;

constructor(private activatedRoute : ActivatedRoute,
  private prodottiService : ProdottiService,
   private router : Router) { } 
  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((param : ParamMap)=>{
this.prodottiId = param.get('id');
  });
  if(this.prodottiId){
  this.prodottiService.getprodotti(this.prodottiId).subscribe(( data: ProdottiView)=>{
    this.selectedProdotti = data;
  },(error)=>{
  this.errorMessage = error;
});
}
  }
  closeAlert() {
    this.isEmptyFields = false;
  }
  public submitUpdateProdotti() {
    if (
      this.selectedProdotti.nome !== '' &&
      this.selectedProdotti.immagine.length > 0 && // Verifica se l'array contiene almeno un'immagine
      this.selectedProdotti.prezzo !== '' &&
      this.selectedProdotti.quantity !== '' &&
      this.selectedProdotti.info !== ''
    ) {
      if (this.prodottiId) {
        this.prodottiService.updateProdotti(this.prodottiId, this.selectedProdotti).subscribe((data: ProdottiView) => {
          this.router.navigate(['/prodotti/admin']).then();
        });
      }
    } else {
      this.isEmptyFields = true;
    }
  }
}
