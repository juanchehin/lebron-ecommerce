import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SucursalesService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';

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


// ==================================================
// 
// ==================================================

bajaProducto(IdProductoSabor: string) {

  Swal.fire({
    title: '¿Desea eliminar el producto?',
    text: "Eliminacion de proveedor",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.productosService.bajaProducto( IdProductoSabor )
      .subscribe({
        next: (resp: any) => { 

  
          if(resp[0][0].Mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Producto dado de baja',false,900);
            this.buscarProducto();
            
          } else {
            this.alertaService.alertFail(resp[0][0].Mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].Mensaje,false,1200); }
      });
    }
  })
}

// =================================================================
publicarProducto(IdProducto: string){
  console.log("pasa publicar producto IdProducto : ",IdProducto)
 
  this.productosService.publicarProducto( IdProducto  )
  .subscribe( {
   next: (resp: any) => {

     console.log("resp busc es : ",resp)

     if ( resp[1][0].Mensaje === 'Ok') {       
      this.alertaService.alertSuccess('top-end','Operacion exitosa',false,900);
     } else {
       this.alertaService.alertFail('Ocurrio un error',false,2000);
     }
     return;
    },
   error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
 });

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
