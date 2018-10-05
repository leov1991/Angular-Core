import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct } from '../product';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  // Modo edición
  editMode: boolean;

  productId: number;

  // Representa el modelo del formulario
  formGroup: FormGroup;

  // FormBuilder permite construir el modelo que representa los cambios de un formulario
  constructor(private fb: FormBuilder,
    private productsSersvice: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Crea un modelo de formulario. Sirve por ejemplo para agregar reglas de validación
    this.formGroup = this.fb.group({
      name: '',
      description: ''
    });

    //Definir parámetros para las rutas activadas (por ejemplo links edit y delete)
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.editMode = true;
      this.productId = params["id"];

      this.productsSersvice.getProductById(this.productId.toString()).subscribe(product => this.loadForm(product),
        error => this.router.navigate(["/products"]));
    })
  }

  // Guardar el registro en la base de datos
  save() {
    let product: IProduct = Object.assign({}, this.formGroup.value);

    if (this.editMode) {
      product.id = this.productId;

      this.productsSersvice.updateProduct(product).subscribe(product => this.onSaveSuccess(),
        error => console.error(error));
    }
    else {
      this.productsSersvice.createProduct(product)
        .subscribe(product => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  // Si el registro se guardó con éxito, navegar hacia personas
  onSaveSuccess() {
    this.router.navigate(["/products"]);
  }

  loadForm(product: IProduct) {
    this.formGroup.patchValue({
      name: product.name,
      description: product.description
    })
  }
}
