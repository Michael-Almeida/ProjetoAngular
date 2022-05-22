import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

//pode ser injetada em outras classes
@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = " http://localhost:3001/products";

  constructor(private SnackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.SnackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  //enviar uma requisição Http para o backEnd
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  //método para leitura dos produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readById (id:String): Observable <Product>{
    /* `` = template String
       ${} - interpolação
    */
    const url =`${this.baseUrl}/${id}}`  
    return this.http.get<Product>(url)
  }

  update (product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }
}
