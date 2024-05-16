import { Component, OnInit } from '@angular/core';
import { ProdottiView } from 'src/app/models/ProductView';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-prodotti-admin',
  templateUrl: './prodotti-admin.component.html',
  styleUrls: ['./prodotti-admin.component.scss'],
})
export class ProdottiAdminComponent implements OnInit {
  public prodotti: ProdottiView[] = [] as ProdottiView[];
  public errorMessage: string | undefined;
  constructor(private prodottiService: ProdottiService) {}

  ngOnInit(): void {
    this.prodottiService.getAllProdotti().subscribe(
      (data: ProdottiView[]) => {
        this.prodotti = data;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  public getProdottiId(prodottiID: string) {
    return prodottiID.substr(prodottiID.length - 5);
  }
  public clickDeleteProdotti(prodottiId: string | undefined) {
    if (prodottiId) {
      this.prodottiService.deleteprodotti(prodottiId).subscribe(
        (data: ProdottiView) => {
          this.prodottiService.getAllProdotti().subscribe(
            (data: ProdottiView[]) => {
              this.prodotti = data;
            },
            (error) => {
              this.errorMessage = error;
            }
          );
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
