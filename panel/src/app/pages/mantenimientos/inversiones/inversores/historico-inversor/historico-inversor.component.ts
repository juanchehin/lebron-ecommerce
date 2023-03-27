import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { InversoresService } from 'src/app/services/inversores.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-historico-inversor',
  templateUrl: './historico-inversor.component.html',
  styles: []
})

export class HistoricoInversorComponent implements OnInit {

  desde = 0;
  historicoInversor!: any;
  totalHistorico = 0;
  cargando = true;
  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));

  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));
  IdInversor: any;
  Apellidos: any;
  Nombres: any;

  constructor(
    public inversoresService: InversoresService,
    private alertService: AlertService,
    public clientesService: ClientesService,
    public activatedRoute: ActivatedRoute,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.IdInversor = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarDatosInversor();
    this.buscarHistoricoInversores();
  }

// ==================================================
// Carga
// ==================================================

buscarHistoricoInversores() {

  const pfechaInicio  = this.utilService.formatDate(this.fechaInicio);
  const pfechaFin = this.utilService.formatDate(this.fechaFin);

  this.inversoresService.listarHistoricoInversor(this.IdInversor, this.desde , pfechaInicio , pfechaFin)
             .subscribe( {
              next: (resp: any) => { 
                
                this.historicoInversor = resp[0];
                this.totalHistorico = resp[1][0].totalTransacciones;

                if (resp[1][0].totalTransacciones === undefined || resp[1][0].totalTransacciones === null) {
                  this.totalHistorico = 0;
                }
                return;
               },
              error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
            });

  }



// ==================================================
// 
// ==================================================

bajaTransaccionInversor(IdPersona: string) {

  Swal.fire({
    title: '¿Desea eliminar el inversor?',
    text: "Eliminacion de inversor",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.inversoresService.bajaInversor( IdPersona )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Inversor dado de baja',false,900);
            this.buscarHistoricoInversores();
            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })

  
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
  this.buscarHistoricoInversores();

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
  this.buscarHistoricoInversores();
}

// ==================================================
//        
// ==================================================

cargarDatosInversor()
{
  this.clientesService.cargarDatosFormEditarCliente( this.IdInversor )
        .subscribe( {
        next: (resp: any) => {
          
        this.Apellidos = resp[0][0].Apellidos;
        this.Nombres = resp[0][0].Nombres;

      },
      error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
      });

};
}
