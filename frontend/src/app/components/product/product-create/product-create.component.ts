import { Product } from "./../product.model";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  
  product: Product = {
    name: "",
    price: null, //trocar
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  //creando o produto
  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Produto criado"); //Mostra a mensagem
      this.router.navigate(["/products"]); //navega para a tela com o cadastro todo
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
