import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styles: []
})
export class VentasComponent implements OnInit {

  desde = 0;
  cargando = false;

  FechaInicio = new Date(2000, 1 , 1);
  FechaFin = new Date(Date.now());
  controlFechas = false;

  totalVentas = 0;
  ventas!: Array < any > ;

  constructor(
    public ventasService: VentasService
  ) {
   }

  ngOnInit() {
    this.cargarVentas();
  }
// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosFechaInicio(nuevaFechaInicio: any) {

  if (nuevaFechaInicio > this.FechaFin) {
    // this.FechaInicio = nuevaFechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosFechaFin(nuevaFechaFin: any) {

  if (nuevaFechaFin < this.FechaInicio) {
    // this.FechaInicio = nuevaFechaFin;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }
  // this.FechaFin = nuevaFechaFin;

}

// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {
    // tslint:disable-next-line: one-variable-per-declaration
    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    // tslint:disable-next-line: prefer-const
    year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
}

// ==================================================
//        Carga 
// ==================================================

cargarVentas() {

  const pFechaInicio  = this.formatDate(this.FechaInicio);
  const pFechaFin = this.formatDate(this.FechaFin);

  this.cargando = true;

  this.ventasService.listarVentasFecha( this.desde , pFechaInicio , pFechaFin)
             .subscribe( (resp: any) => {
              // Controlar que el cliente exista AQUI , ver como se puede capturar el mensaje enviado desde el SQL

              this.totalVentas = resp[1][0].cantVentas;

              this.ventas = resp[0];

              console.log("resp es : ",resp);

              if (resp[1][0].cantVentas === undefined || resp[1][0].cantVentas === null) {
                this.totalVentas = 0;
              }

              this.cargando = false;

            });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalVentas ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarVentas();

}


// ==================================================
//        Mensaje al presionar un boton
// ==================================================
mensajeIngreso() {
  // Swal.fire({
  //   position: 'top-end',
  //   icon: 'info',
  //   title: 'Seleccione el cliente',
  //   showConfirmButton: false,
  //   timer: 2000
  // });
}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarVentas();
}


}
