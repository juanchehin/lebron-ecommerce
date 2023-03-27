import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BackupsService } from 'src/app/services/backups.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

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
  index: any;

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

        if(resp[2][0].mensaje == 'Ok') {
          this.backups = resp[0];
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: () => {  this.alertService.alertFail('Ocurrio un error',false,400); }
    });
  }


// ==================================================
//    Sincronizacion con Google Drive
// ==================================================

sinc(name: string,id: string,pIndex: any) {

  this.cargando = true;
  this.index = pIndex;

  this.backupsService.sinc(name,id )
  .subscribe( (resp: any) => {

    if ( resp.mensaje === 'Ok') {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sincronizacion realizado con exito',
        showConfirmButton: false,
        timer: 2000
      });
      this.cargarBackups();
      this.cargando = false;
    } else {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un problema',
            text: resp.mensaje
          });
        }
      return;

  });

}

// ==================================================
//        Backup
// ==================================================

altaBackup() {

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Recuerde que esto puede tardar unos minutos',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  })
  .then( confirmar => {

    if (confirmar.value) {

      this.backupsService.altaBackup( )
      .subscribe( (resp: any) => {

        if ( resp.mensaje === 'Ok') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Backup realizado con exito',
            showConfirmButton: false,
            timer: 2000
          });
          this.cargarBackups();
        } else {
              Swal.fire({
                icon: 'error',
                title: 'Hubo un problema al cargar',
                text: resp.mensaje
              });
            }
          return;

      });

    }
  })
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
