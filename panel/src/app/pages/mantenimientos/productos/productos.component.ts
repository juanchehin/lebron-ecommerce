import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  productos!: any;
  cantPlanes = 0;

  totalProductos = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarProductos();
  }

// ==================================================
// Carga
// ==================================================

cargarProductos() {

    this.productosService.listarProductosPaginado( this.desde  )
               .subscribe( (resp: any) => {

                this.totalProductos = resp[1][0].cantProductos;

                this.productos = resp[0];

                this.cargando = false;

              });

  }


// ==================================================
//  Busca un cliente por plan o por todos
// ==================================================

  buscarCliente( ) {

    const inputElement: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
    const Apellidos: any = inputElement.value || null;

    const inputElement1: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
    const Nombres: any = inputElement1.value || null;

    // this.personaService.buscarClientePorPlan( Apellidos, Nombres , this.planSeleccionado.toString()  )
    //         .subscribe( (resp: any) => {

    //           if( resp.length !== 0 ) {
    //             this.clientes = resp[0];
    //             this.totalClientes = resp[1][0].cantCli;
    //           } else {
    //             this.totalClientes = 0;
    //             this.clientes = resp[0];
    //           }
    //         });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalProductos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarProductos();

}


publicarProducto(IdProducto: string){
  console.log("pasa publicar producto IdProducto : ",IdProducto)
}


destacarProducto(IdProducto: string){
  console.log("pasa destacarProducto producto IdProducto : ",IdProducto)
}


promocionProducto(IdProducto: string){
  console.log("pasa promocionProducto producto IdProducto : ",IdProducto)
}


ofertaProducto(IdProducto: string){
  console.log("pasa ofertaProducto producto IdProducto : ",IdProducto)
}


}
