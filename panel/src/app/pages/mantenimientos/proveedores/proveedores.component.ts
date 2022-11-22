import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: []
})
export class ProveedoresComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  proveedores!: any;
  cantPlanes = 0;

  totalProveedores = 0;
  cargando = true;

  constructor(
    public proveedoresService: ProveedoresService
  ) {
   }

  ngOnInit() {
    this.cargarProveedores();
  }

// ==================================================
// Carga
// ==================================================

cargarProveedores() {
  console.log("pasa cargar cargarProveedores");

    this.proveedoresService.listarProveedoresPaginado( this.desde  )
               .subscribe( (resp: any) => {

                console.log("resp es : ",resp)

                this.totalProveedores = resp[1][0].cantProveedores;

                this.proveedores = resp[0];

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

  const desde = this.desde + valor;

  if ( desde >= this.totalProveedores ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarProductos();

}




}
