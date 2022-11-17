import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styles: []
})
export class PromocionesComponent implements OnInit {

  public imgTemp: any = '../../../assets/img/lebron_lebron.png';
  productosPromocionHome!: any;
  usuarios!: any;
  totalProductosDestacados = 0;

  constructor(
    public productosService: ProductosService
  ) {
   }

  ngOnInit() {
    this.cargarProductosPromocionHome();
  }

  // ==================================================
  // Carga
  // ==================================================

  cargarProductosPromocionHome() {

    this.productosService.listarProductosPromocionHome(  )
      .subscribe( (resp: any) => {

     this.productosPromocionHome = resp[0];

   });

    }




}
