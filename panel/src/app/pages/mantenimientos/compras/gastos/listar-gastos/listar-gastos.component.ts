import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ComprasService } from 'src/app/services/compras.service';

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
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.fecha = this.formatDateNow(new Date(Date.now()));
    this.cargarGastos();
  }

// ==================================================
// Carga
// ==================================================

cargarGastos() {
  console.log("pasa cargar cargarGastos");

  const pFecha = this.formatDate(this.fecha);

    this.comprasService.listarGastosPaginado( this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        console.log("resp en gastos ",resp)

        if(resp[2][0].Mensaje == 'Ok') {
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

// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {

  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),month = '' + (d.getMonth() + 1),day = '' + (d.getDate() + 1),
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
}
