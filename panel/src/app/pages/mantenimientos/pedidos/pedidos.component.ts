import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { PedidosService } from 'src/app/services/pedidos.service';

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
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.formatDate(previous);
    this.cargarPedidos();
  }

// ==================================================
// Carga
// ==================================================

cargarPedidos() {

  const pFecha = this.formatDate(this.fecha);

    this.pedidosService.listarPedidosPaginado( this.desde ,pFecha )
    .subscribe({
      next: (resp: any) => { 

        if(resp[1][0].Mensaje == 'Ok') {
          this.pedidos = resp[0];
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: () => {  this.alertService.alertFail('Ocurrio un error',false,400); }
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

// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {

  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),month = '' + (d.getMonth() + 1),day = '' + (d.getDate() + 1),
  // tslint:disable-next-line: prefer-const
  year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }

  return [year, month, day].join('-');
}

}
