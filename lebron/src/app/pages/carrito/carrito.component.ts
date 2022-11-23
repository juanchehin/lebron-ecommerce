import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: []
})
export class CarritoComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  usuarios!: any;
  cantPlanes = 0;
  IdPersona: any;

  totalUsuarios = 0;
  cargando = true;

  constructor(
    public usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarCarritoUsuario();
  }

// ==================================================
// Carga
// ==================================================

cargarCarritoUsuario() {
  console.log("pasa cargarCarritoUsuario");

  this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');

    // this.usuariosService.listarCarritoUsuario( this.desde  )
    //            .subscribe( (resp: any) => {

    //             console.log("resp es : ",resp)

    //             this.totalItemsCarrito = resp[1][0].cantItemsCarrito;

    //             this.itemsCarrito = resp[0];

    //             this.cargando = false;

    //           });

  }



// // ==================================================
// //        Borra un item del carrito
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

  const desde = this.desde + valor;

  if ( desde >= this.totalUsuarios ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarUsuarios();

}




}
