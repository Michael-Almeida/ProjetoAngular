import { Product } from "./../product.model";
import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";

// Dados
const EXAMPLE_DATA: Product[] = [
  { id: 1, name: "Hydrogen" , price:9.99},
  { id: 2, name: "Helium" , price:9.99},
  { id: 3, name: "Lithium" , price:9.99},
  { id: 4, name: "Beryllium" , price:9.99},
  { id: 5, name: "Boron" , price:9.99},
  { id: 6, name: "Carbon" , price:9.99},
  { id: 7, name: "Nitrogen" , price:9.99},
  { id: 8, name: "Oxygen" , price:9.99},
  { id: 9, name: "Fluorine" , price:9.99},
  { id: 10, name: "Neon" , price:9.99},
  { id: 11, name: "Sodium" , price:9.99},
  { id: 12, name: "Magnesium" , price:9.99},
  { id: 13, name: "Aluminum" , price:9.99},
  { id: 14, name: "Silicon" , price:9.99},
  { id: 15, name: "Phosphorus" , price:9.99},
  { id: 16, name: "Sulfur" , price:9.99},
  { id: 17, name: "Chlorine" , price:9.99},
  { id: 18, name: "Argon" , price:9.99},
  { id: 19, name: "Potassium" , price:9.99},
  { id: 20, name: "Calcium" , price:9.99},
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA; //lista de produtos
  paginator: MatPaginator | undefined; //componente de paginação
  sort: MatSort | undefined; //ordenação dos dados

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.

      //chama o operador merge do rxjs
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          /*
          getStoradeData = método que ordena os dados
          getPageData = Após ordenados passa para função que irá pegar a página selecionada
          */
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        "Please set the paginator and sort on the data source before connecting."
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   * Pega a página atual
   * splice = pega um sub array dentro de um array maior (passando o index inicial e quantidade de elementos)
   */
  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  //Método que faz a ordenação dos dados
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === "asc";
      switch (this.sort?.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "id":
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
