import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styles: []
})
export class PromocionesComponent implements OnInit {

  promociones!: any;
  totalPromociones = 0;
  desde = 0;

  constructor(
    public productosService: ProductosService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarPromociones();
  }

// ==================================================
// Carga
// ==================================================

cargarPromociones() {

    this.productosService.listarPromocionesPaginado( this.desde  )
               .subscribe( (resp: any) => {

                this.totalPromociones = resp[1][0].cantPromociones;

                this.promociones = resp[0];


              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalPromociones ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarPromociones();

}


publicarPromocion(IdPromocion: string){
  console.log("pasa publicar publicarPromocion IdPromocion : ",IdPromocion)
}

}
