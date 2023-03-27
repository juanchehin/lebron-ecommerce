import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  desde = 0;
  ClasesDisponibles = 0;
  fecha: any;
  pedidos!: any;
  cantPlanes = 0;
  controlFechas = false;
  totalProductos = 0;
  cargando = true;

  constructor(
    public pedidosService: PedidosService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.utilService.formatDate(previous);
    this.cargarPedidos();
  }

// ==================================================
// Carga
// ==================================================

cargarPedidos() {

  const pFecha = this.utilService.formatDate(this.fecha);

    this.pedidosService.listarPedidosPaginado( this.desde ,pFecha )
    .subscribe({
      next: (resp: any) => { 

        if(resp[1][0].mensaje == 'Ok') {
          this.pedidos = resp[0];
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: () => {  this.alertService.alertFail('Ocurrio un error',false,400); }
    });
  }

// ==================================================
// confirma pedido
// ==================================================

confirmarPedido(IdPedido: string) {

  
  Swal.fire({
    title: '¿Desea confirmar el pedido?',
    text: "Confirmacion entrega de pedido",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.pedidosService.confirmarPedido( IdPedido )
      .subscribe({
        next: (resp: any) => { 
  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Pedido confirmado',false,900);
            this.cargarPedidos();
            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })

  
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
  // this.cargarPedidos();

}

// ==================================================
// Detecta los cambios en el select
// ==================================================
cambiosFecha(nuevaFechaInicio: any) {

  if (nuevaFechaInicio > this.fecha) {
    // this.FechaInicio = nuevaFechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarPedidos();
}

}
