import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

//pode ser injetada em outras classes
@Injectable({
  providedIn: "root",
})
export class ProductService {

  constructor(private SnackBar: MatSnackBar) {}

  showMessage(msg: string): void {
    this.SnackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
