import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DolaresService } from 'src/app/services/dolares.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-historico-dolares',
  templateUrl: './historico-dolares.component.html',
  styles: []
})

export class HistoricoDolaresComponent implements OnInit {

  desde = 0;
  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));
  controlFechas = false;
  totalHistorico = 0;
  historicoDolares: any;
  dolarHoy = 0;
  filtroTipo = 0;

  constructor(
    public dolaresService: DolaresService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.listarHistoricoDolares();
  }

// ==================================================
// Carga
// ==================================================

listarHistoricoDolares() {

  const pfechaInicio  = this.utilService.formatDate(this.fechaInicio);
  const pfechaFin = this.utilService.formatDate(this.fechaFin);

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
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

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

  if(this.fechaInicio > this.fechaFin)
  {
    this.alertService.alertFail('Error de fechas',false,2000)
    return;
  }
  this.desde = 0;
  this.listarHistoricoDolares();
}


}
