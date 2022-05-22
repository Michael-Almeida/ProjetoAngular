import { Product } from "./../product.model";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { ProductRead2DataSource } from "./product-read2-datasource";

@Component({
  selector: "app-product-read2",
  templateUrl: "./product-read2.component.html",
  styleUrls: ["./product-read2.component.css"],
})

//Pega elementos na view criando atributos dentro do código .ts
export class ProductRead2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. 
   * Colunas que estão visíveis na tabela
  */
  displayedColumns = ["id", "name", "price"];

  constructor() {
    this.dataSource = new ProductRead2DataSource();
  }

  ngOnInit() {
    this.dataSource = new ProductRead2DataSource();
  }

  //Depois que inicializa os componente na tela faz a ligação 
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource; //se comentado ele não terá mais os dados da tabela
  }
}
