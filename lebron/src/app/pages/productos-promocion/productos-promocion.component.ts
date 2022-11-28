import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-productos-promocion',
  templateUrl: './productos-promocion.component.html',
  styles: []
})
export class ProductosPromocionComponent implements OnInit {

  desde = 0;
  numbers: any[] = [];
  totalAsistencias = true;
  public imgTemp: any = '../../../assets/img/lebron_lebron.png';
  url_imagenes_producto = url_imagenes_producto;
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

    this.productosService.listarProductosPromocionPaginado( this.desde  )
               .subscribe( (resp: any) => {

                this.productosPromocion = resp[0];

                console.log("imgtest : ", this.imgTemp);
                console.log("this.productosPromocion : ", this.productosPromocion);

                this.totalProductosPromocion = resp[1][0].cantProductosPromocion;

                if(this.totalProductosPromocion > 12)
                {
                  this.cantidadPaginado = Math.ceil(this.totalProductosPromocion/12);
                }
                else
                {
                  this.cantidadPaginado = 1;
                }

                this.numbers = Array.from({length: this.cantidadPaginado}, (_, i) => i + 1)

              });

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
