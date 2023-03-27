import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ComprasService } from 'src/app/services/compras.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styles: []
})
export class ListarGastosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  fecha: any;
  gastos!: any;
  controlFechas = false;
  totalGastos = 0;
  cargando = true;

  constructor(
    public comprasService: ComprasService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha = this.utilService.formatDateNow(Date.now());
    this.cargarGastos();
  }

// ==================================================
// Carga
// ==================================================

cargarGastos() {
  console.log("pasa cargar cargarGastos");

  const pFecha = this.utilService.formatDate(this.fecha);

    this.comprasService.listarGastosPaginado( this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        console.log("resp en gastos ",resp)

        if(resp[2][0].mensaje == 'Ok') {
          this.gastos = resp[0];
          this.totalGastos = resp[1][0].totalGastos;
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: () => {  this.alertService.alertFail('Ocurrio un error',false,400); }
    });

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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalGastos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarGastos();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarGastos();
}

}
