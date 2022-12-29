import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: []
})
export class VentasComponent implements OnInit {

  desde = 0;
  cargando = false;
  fechaInicio = this.formatDateNow(new Date(Date.now()));
  fechaFin = this.formatDateNow(new Date(Date.now()));
  controlFechas = false;
  totalVentas = 0;
  ventas!: Array < any > ;

  constructor(
    public ventasService: VentasService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarVentas();
  }


// ==================================================
//        Carga 
// ==================================================

cargarVentas() {

  const pfechaInicio  = this.formatDate(this.fechaInicio);
  const pfechaFin = this.formatDate(this.fechaFin);

  this.cargando = true;

  this.ventasService.listarVentasFecha( this.desde , pfechaInicio , pfechaFin)
             .subscribe( {
              next: (resp: any) => { 
                
                this.totalVentas = resp[1][0].totalVentas;

                this.ventas = resp[0];

                if (resp[1][0].cantVentas === undefined || resp[1][0].cantVentas === null) {
                  this.totalVentas = 0;
                }else {
                  this.alertService.alertFail('Ocurrio un error',false,2000);
                }
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
  this.cargarVentas();
}


}
