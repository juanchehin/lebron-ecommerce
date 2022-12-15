import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: []
})
export class ComprasComponent implements OnInit {

  desde = 0;
  cargando = false;
  fecha: any;

  FechaInicio = new Date(2000, 1 , 1);
  FechaFin = new Date(Date.now());
  controlFechas = false;

  totalCompras = 0;
  compras!: Array < any > ;

  constructor(
    public comprasService: ComprasService
  ) {
   }

  ngOnInit() {
    this.cargarCompras();
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
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosFecha(nuevaFechaFin: any) {

  

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

cargarCompras() {

  const pFechaInicio  = this.formatDate(this.FechaInicio);
  const pFechaFin = this.formatDate(this.FechaFin);

  this.cargando = true;

  this.comprasService.listarComprasFecha( this.desde , pFechaInicio , pFechaFin)
             .subscribe( (resp: any) => {
              // Controlar que el cliente exista AQUI , ver como se puede capturar el mensaje enviado desde el SQL

              this.totalCompras = resp[1][0].cantCompras;

              this.compras = resp[0];

              console.log("resp es : ",resp);

              if (resp[1][0].cantCompras === undefined || resp[1][0].cantCompras === null) {
                this.totalCompras = 0;
              }

              this.cargando = false;

            });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalCompras ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarCompras();

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
  this.cargarCompras();
}


}
