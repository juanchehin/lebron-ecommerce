import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DolaresService } from 'src/app/services/dolares.service';

@Component({
  selector: 'app-historico-dolares',
  templateUrl: './historico-dolares.component.html',
  styles: []
})

export class HistoricoDolaresComponent implements OnInit {

  desde = 0;
  cargando = false;
  fechaInicio = this.formatDateNow(new Date(Date.now()));
  fechaFin = this.formatDateNow(new Date(Date.now()));
  controlFechas = false;
  totalHistorico = 0;
  historicoDolares: any;
  dolarHoy = 0;
  filtroTipo = 0;

  constructor(
    public dolaresService: DolaresService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.listarHistoricoDolares();
  }

// ==================================================
// Carga
// ==================================================

listarHistoricoDolares() {

  const pfechaInicio  = this.formatDate(this.fechaInicio);
  const pfechaFin = this.formatDate(this.fechaFin);

  this.cargando = true;

  this.dolaresService.listarHistoricoDolares( this.filtroTipo, this.desde , pfechaInicio , pfechaFin)
             .subscribe( {
              next: (resp: any) => { 

                this.totalHistorico = resp[1][0].totalTransacciones;

                this.historicoDolares = resp[0];

                return;
               },
              error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
            });
  }


// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosfechaInicio(nuevafechaInicio: any) {

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
cambiosfechaFin(nuevafechaFin: any) {

  if (nuevafechaFin < this.fechaInicio) {
    // this.fechaInicio = nuevafechaFin;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }
  // this.fechaFin = nuevafechaFin;

}

// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {
  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + (d.getDate() + 1),
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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

const desde = this.desde + valor;

if ( desde >= this.totalHistorico ) {
  return;
}

if ( desde < 0 ) {
  return;
}

this.desde += valor;
this.listarHistoricoDolares();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
// Reseteo 'desde' a cero

if(this.fechaInicio > this.fechaFin)
{
  this.alertService.alertFail('Error de fechas',false,2000)
  return;
}
this.desde = 0;
this.listarHistoricoDolares();
}


}
