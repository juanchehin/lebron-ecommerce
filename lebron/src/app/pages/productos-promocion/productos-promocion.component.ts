import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-promocion',
  templateUrl: './productos-promocion.component.html',
  styles: []
})
export class ProductosPromocionComponent implements OnInit {

  desde = 0;
  numbers: any[] = [];
  totalAsistencias = true;
  ClasesDisponibles = 0;

  productosPromocion!: any;
  cantPlanes = 0;

  totalProductosPromocion = 0;
  cantidadPaginado = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService
  ) {
   }

  ngOnInit() {
    this.cargarProductosPromocion();
  }

// ==================================================
// Carga
// ==================================================

cargarProductosPromocion() {
  console.log("pasa cargar cargarProductosPromocion");

    this.productosService.listarProductosPromocionPaginado( this.desde  )
               .subscribe( (resp: any) => {

                console.log("resp cargarProductosPromocion es : ",resp)

                this.productosPromocion = resp[0];

                this.totalProductosPromocion = resp[1][0].cantProductosPromocion;

                if(this.totalProductosPromocion > 12)
                {
                  this.cantidadPaginado = Math.ceil(this.totalProductosPromocion/12);
                }
                else
                {
                  this.cantidadPaginado = 1;
                }

                console.log("cantidadPaginado: " + this.cantidadPaginado)

                this.numbers = Array.from({length: this.cantidadPaginado}, (_, i) => i + 1)


                // this.cargando = false;

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

// // ==================================================
// //        Borra una persona
// // ==================================================

//  eliminarCliente( cliente: any ) {

//     Swal.fire({
//       title: '¿Esta seguro?',
//       text: 'Esta a punto de borrar a ' + cliente.Nombres + ' ' + cliente.Apellidos,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Si, borrar!'
//     })
//     .then( borrar => {

//       if (borrar) {

//         const parametro = cliente.IdPersona.toString();

//         this.personaService.eliminarCliente( parametro )
//                   .subscribe( (resp: any) => {
//                       this.cargarClientes();
//                       if ( resp.mensaje === 'Ok') {
//                         Swal.fire({
//                           position: 'top-end',
//                           icon: 'success',
//                           title: 'Cliente eliminado',
//                           showConfirmButton: false,
//                           timer: 2000
//                         });
//                       } else {
//                         Swal.fire({
//                           icon: 'error',
//                           title: 'Error al eliminar',
//                           text: 'Contactese con el administrador',
//                         });
//                       }
//                       this.cargarClientes();

//                     });

//                   }
//                 });
//               }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  // const desde = this.desde + valor;

  // if ( desde >= this.totalUsuarios ) {
  //   return;
  // }

  // if ( desde < 0 ) {
  //   return;
  // }

  // this.desde += valor;
  // this.cargarUsuarios();

}




}
