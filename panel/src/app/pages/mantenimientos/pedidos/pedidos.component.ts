import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  desde = 0;
  ClasesDisponibles = 0;

  pedidos!: any;
  cantPlanes = 0;

  totalProductos = 0;
  cargando = true;

  constructor(
    public pedidosService: PedidosService
  ) {
   }

  ngOnInit() {
    this.cargarPedidos();
  }

// ==================================================
// Carga
// ==================================================

cargarPedidos() {

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


}
