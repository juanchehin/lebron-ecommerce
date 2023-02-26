import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: []
})
export class VentasComponent implements OnInit {

  desde = 0;
  cargando = false;
  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));
  controlFechas = false;
  totalVentas = 0;
  ventas!: Array < any > ;

  constructor(
    public ventasService: VentasService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.cargarVentas();
  }


// ==================================================
//        Carga 
// ==================================================

cargarVentas() {

  const pfechaInicio  = this.utilService.formatDate(this.fechaInicio);
  const pfechaFin = this.utilService.formatDate(this.fechaFin);

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
              error: () => { 
                this.alertService.alertFail('Ocurrio un error',false,2000)
              }
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
