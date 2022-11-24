import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styles: []
})
export class UnidadesComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  unidades!: any;
  cantPlanes = 0;

  totalUnidades = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService
  ) {
   }

  ngOnInit() {
    this.cargarUnidades();
  }

// ==================================================
// Carga
// ==================================================

cargarUnidades() {

    this.productosService.listarUnidadesPaginado( this.desde  )
               .subscribe( (resp: any) => {

                console.log("resp unidades ",resp)
                this.totalUnidades = resp[1][0].cantUnidades;

                this.unidades = resp[0];

                this.cargando = false;

              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalUnidades ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarUnidades();

}


}
