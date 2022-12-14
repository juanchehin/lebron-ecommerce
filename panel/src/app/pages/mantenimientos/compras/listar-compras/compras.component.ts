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

  fechaInicio = this.formatDateNow(new Date(Date.now()));
  fechaFin = this.formatDateNow(new Date(Date.now()));
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
cambiosFechaInicio(nuevafechaInicio: any) {

  if (nuevafechaInicio > this.fechaFin) {
    // this.fechaInicio = nuevafechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosFechaFin(nuevafechaFin: any) {

  if (nuevafechaFin < this.fechaInicio) {
    // this.fechaInicio = nuevafechaFin;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }
  // this.fechaFin = nuevafechaFin;

}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosFecha(nuevafechaFin: any) {

  

}

// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {
    // tslint:disable-next-line: one-variable-per-declaration
    let d = new Date(date),
    month = '' + (d.getMonth()),
    day = '' + d.getDate(),
    // tslint:disable-next-line: prefer-const
    year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
}
// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDateNow(date: any) {
  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + (d.getDate()),
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

  const pfechaInicio  = this.fechaInicio;
  const pfechaFin = this.fechaFin;

  this.cargando = true;

  this.comprasService.listarComprasFecha( this.desde , pfechaInicio , pfechaFin)
             .subscribe( (resp: any) => {
              // Controlar que el cliente exista AQUI , ver como se puede capturar el mensaje enviado desde el SQL
              console.log("resp es :",resp)
              this.totalCompras = resp[1][0].cantCompras;

              this.compras = resp[0];

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
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarCompras();
}


}
