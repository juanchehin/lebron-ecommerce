import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styles: []
})
export class PromocionesComponent implements OnInit {

  public imgTemp: any = '../../../assets/img/lebron_lebron.png';
  promocionesHome!: any;
  usuarios!: any;
  totalProductosDestacados = 0;

  constructor(
    public productosService: ProductosService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarPromocionHome();
  }

  // ==================================================
  // Carga
  // ==================================================

  cargarPromocionHome() {

    this.productosService.cargarPromocionHome(  )
      .subscribe( (resp: any) => {

     this.promocionesHome = resp[0];

   });

    }

// ==================================================
// Carga
// ==================================================

rutearDetallePromocion(IdPromocion: any) {

  this.router.navigate(['/promocion',IdPromocion]);

  }



}
