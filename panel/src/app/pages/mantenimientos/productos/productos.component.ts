import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SucursalesService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  IdSucursal = 1;
  productos!: any;
  sucursales: any;
  totalProductos = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    private sucursalesService: SucursalesService,
    public alertaService: AlertService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.buscarProducto();
    this.cargarSucursales();
  }

// ==================================================
// Carga
// ==================================================

buscarProducto() {

    const inputElement: HTMLInputElement = document.getElementById('buscarProducto') as HTMLInputElement;
    const productoBuscado: any = inputElement.value || null;

    console.log("productoBuscado : ",productoBuscado)

    this.productosService.listarProductosPaginado( this.desde , this.IdSucursal, productoBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  console.log("resp busc es : ",resp)

                  if(resp[0].length <= 0)
                  { 
                    this.productos = [];
                    this.totalProductos = 0;
                    return;
                  }
  
                  if ( resp[1][0].Mensaje === 'Ok') {
                    
                    this.totalProductos = resp[0][0].cantProductosBuscados;
                    this.productos = resp[0];
                    
                    // this.router.navigate(['/dashboard/ventas']);
                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
              });

  }

// ==================================================
// Carga
// ==================================================

cargarSucursales() {


  this.sucursalesService.listarTodasSucursales(   )
             .subscribe( (resp: any) => {

              console.log("resp es : ",resp)

              this.sucursales  = resp[0];

              this.cargando = false;

            });

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
  this.buscarProducto();

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
