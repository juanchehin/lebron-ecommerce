import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BackupsService } from 'src/app/services/backups.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
  styles: []
})
export class BackupsComponent implements OnInit {

  desde = 0;
  backups!: any;
  totalBackups = 0;
  fecha: any;
  cargando = true;
  controlFechas = false;

  constructor(
    public backupsService: BackupsService,
    public alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.utilService.formatDate(previous);
    this.cargarBackups();
  }

// ==================================================
// Carga
// ==================================================

cargarBackups() {

  const pFecha = this.utilService.formatDate(this.fecha);

    this.backupsService.listarBackupsPaginado( this.desde ,pFecha )
    .subscribe({
      next: (resp: any) => { 

        if(resp[1][0].Mensaje == 'Ok') {
          this.backups = resp[0];
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: () => {  this.alertService.alertFail('Ocurrio un error',false,400); }
    });
  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalBackups ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarBackups();

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
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarBackups();
}

}
