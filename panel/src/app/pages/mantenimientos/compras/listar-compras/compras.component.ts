import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ComprasService } from 'src/app/services/compras.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: []
})
export class ComprasComponent implements OnInit {

  desde = 0;
  fecha: any;

  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));
  controlFechas = false;

  total_compras = 0;
  compras!: Array < any > ;

  constructor(
    public comprasService: ComprasService,
    private utilService: UtilService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.listar_compras_paginado_fecha();
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
//        Carga 
// ==================================================

listar_compras_paginado_fecha() {

  const pfechaInicio  = this.fechaInicio;
  const pfechaFin = this.fechaFin;

  this.comprasService.listarComprasFecha( this.desde , pfechaInicio , pfechaFin)
             .subscribe({             
              next: (resp: any) => {

                if(resp[2][0].mensaje == 'ok') {

                  this.total_compras = resp[1][0].total_compras;

                  this.compras = resp[0];
                  
                } else {
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
                }
              
                return;
               },
              error: () => { 
                this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000)
              }

            });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.total_compras ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_compras_paginado_fecha();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.listar_compras_paginado_fecha();
}


}
