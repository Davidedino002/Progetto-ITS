import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdottiView } from '../models/ProductView';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdottiService {
  public cartitemlist: ProdottiView[] = [];
  public amount: number = 0;
  private productlist: BehaviorSubject<ProdottiView[]> = new BehaviorSubject<ProdottiView[]>([]);
  
constructor(private httpClient: HttpClient) { }
products() {
  return this.productlist.asObservable();
}
getProdottoById(prodottoId: string): Observable<ProdottiView> {
  const url = `http://localhost:5000/api/v1/prodotto/${prodottoId}`;
  return this.httpClient.get<ProdottiView>(url);
}
getProdottiNelCarrello(): Observable<ProdottiView[]> {
  return this.httpClient.get<ProdottiView[]>('http://localhost:5000/api/v1/tuttiprodotti');
}

 //funzione aggiungi al carrello
 aggiungialcarrello(data: ProdottiView) {
  const esisteprodottoindex = this.cartitemlist.findIndex(item => item._id === data._id);
  if (esisteprodottoindex !== -1) {
    alert("Il prodotto è già stato aggiunto al carrello");
  } else {
    this.cartitemlist.push(data);
    this.productlist.next(this.cartitemlist);
  }
}
// Metodo per ottenere il numero di articoli nel carrello
getCartItemsCount(): number {
  return this.cartitemlist.length;
}
// Rimuovi prodotti dal carrello
rimuoviprodotti(data: ProdottiView) {
  this.cartitemlist = this.cartitemlist.filter(item => item._id !== data._id);
  this.productlist.next(this.cartitemlist);
}
//calcolo totale
calcolareprezzo() {
  let total = 0;
  this.cartitemlist.map((a: any) => {
    total += a.price;
  });
  return total;
}

//rimuovi elementi dal carrello
rimuovituttiglielementi() {
  this.cartitemlist = [];
  this.productlist.next(this.cartitemlist)
}
//passaggio di dati da un componente ad un altro 
sendfinalamount(data:number){
  this.amount= data
  }
 riceviimportofinale(){
  return this.amount;
  
 }
 //getproduct() {
 // return this.httpClient.get<ProdottiView[]>('http://localhost:5000/api/v1/tuttiprodotti');
//}



  public createProdotti(prodotti:ProdottiView):Observable<ProdottiView>{
    let serverURL : string = `http://localhost:5000/api/v1/prodotti`;
   return this.httpClient.post<ProdottiView>(serverURL, prodotti).pipe(
    catchError(this.GestioneError)
   );
  }

public updateProdotti(prodottiId : string, prodotti : ProdottiView):Observable<ProdottiView>{
let serverURL : string = `http://localhost:5000/api/v1/prodotti/${prodottiId}`;
return this.httpClient.put<ProdottiView>(serverURL, prodotti).pipe(
catchError(this.GestioneError)
)
}

public getAllProdotti():Observable<ProdottiView[]>{
  let serverURL : string = `http://localhost:5000/api/v1/tuttiprodotti`;
return this.httpClient.get<ProdottiView[]>(serverURL).pipe(
  catchError(this.GestioneError)
)
}

public getprodotti(prodottiId: string):Observable<ProdottiView>{
let serverURL : string = `http://localhost:5000/api/v1/prodotto/${prodottiId}`;
return this.httpClient.get<ProdottiView>(serverURL).pipe(
  catchError(this.GestioneError)
)
}

public deleteprodotti(prodottiId: string):Observable<ProdottiView>{
  let serverURL : string = `http://localhost:5000/api/v1/prodotto/${prodottiId}`;
  return this.httpClient.delete<ProdottiView>(serverURL).pipe(
    catchError(this.GestioneError)
  )
  }
private GestioneError(error:HttpErrorResponse){
  let errorMessage : string = '';
  if(error.status === 0){
  //Si è verificato un errore lato client o di rete. Gestirlo di conseguenza.
  errorMessage = `An error occurred: ${error.error}`;
  }else{
  //il backend ha restituito un codice di risposta non riuscita
   errorMessage =  `Beckend returned code ${error.status},body was : ${error.error}`;
  
  }
  errorMessage += `Beckend returned code ${error.status},body was : ${error.error}`;
  return throwError(errorMessage);
  }
  public salvaDatiNelDatabase(frase: string): Observable<any> {
  let serverURL : string = 'http://localhost:5000/api/v1/acquisti'; // URL della tua rotta di acquisto nel backend
  return this.httpClient.delete<ProdottiView>(serverURL).pipe(
    catchError(this.GestioneError)
  )
  }
}
