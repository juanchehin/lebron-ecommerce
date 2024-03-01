import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { InversoresService } from 'src/app/services/inversores.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inversores',
  templateUrl: './inversores.component.html',
  styleUrls: []
})

export class InversoresComponent implements OnInit {

  activarModalNuevaInversion = false;
  desde = 0;
  inversores!: any;
  cantPlanes = 0;
  tasaInteres = 0;
  totalInversores = 0;
  IdPersona = 0;
  monto = 0;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalAltaInversor') divCerrarModalAltaInversor!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalAltaInversion') divCerrarModalAltaInversion!: ElementRef<HTMLElement>;

  //
  apellidos_alta_inversor: any;
  nombres_alta_inversor: any;
  dni_alta_inversor: any;
  telefono_alta_inversor: any;
  email_alta_inversor: any;
  observaciones_alta_inversor: any;
  fecha_nac_alta_inversor: any;

  //
  monto_inversion: any;
  fecha_alta_inversion: any;
  observaciones_alta_inversion: any;

  constructor(
    public inversoresService: InversoresService,
    private alertService: AlertService,
    public authService: AuthService,
    public alertaService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha_alta_inversion = this.utilService.formatDateNow(new Date(Date.now()));
    this.fecha_nac_alta_inversor = this.utilService.formatDateNow(new Date(Date.now()));

    this.buscarInversores();
  }

// ==================================================
// Carga
// ==================================================

buscarInversores() {

    const inputElement: HTMLInputElement = document.getElementById('inversorBuscado') as HTMLInputElement;
    const inversorBuscado: any = inputElement.value || null;

    this.inversoresService.buscarInversorPaginado( this.desde, inversorBuscado  )
               .subscribe( {
                next: (resp: any) => { 
                  
                  if(resp[3] && resp[3][0].mensaje == 'Ok')
                  { 
                    this.totalInversores = resp[1][0].cantInversores;
                    this.tasaInteres = resp[2][0].tasaInteres;    
                    this.inversores = resp[0];

                    return;
                  } else {
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
//  
// ==================================================

alta_inversion(){

  if ( (this.monto_inversion <= 0) || (this.monto_inversion == '')) {
    this.alertaService.alertFail('Monto invalido',false,2000);
    return;
  }

  const datosNuevaInversion = [
    this.monto_inversion,
    this.fecha_alta_inversion,
    this.observaciones_alta_inversion
  ]

  this.inversoresService.altaMontoInversion( datosNuevaInversion )
  .subscribe({
    next: (resp: any) => {

      if ( resp[0][0].mensaje == 'Ok') {
        this.alertaService.alertSuccess('top-end','Inversion cargada',false,2000);

        this.activarModalNuevaInversion = false;
        
        this.cerrarModal();
        
        // this.router.navigate(['/dashboard/ventas']);
      } else {
        this.alertaService.alertFail('Ocurrio un error',false,2000);
      }
      return;
     },
    error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
  });
}

// ==================================================
//  
// ==================================================

baja_monto_inversion(){

  if ( (this.monto_inversion <= 0) || (this.monto_inversion == '')) {
    this.alertaService.alertFail('Monto invalido',false,2000);
    return;
  }

  const datosBajaInversion = [
    this.monto_inversion,
    this.fecha_alta_inversion,
    this.observaciones_alta_inversion
  ]

  this.inversoresService.altaMontoInversion( datosBajaInversion )
  .subscribe({
    next: (resp: any) => {

      if ( resp[0][0].mensaje == 'Ok') {
        this.alertaService.alertSuccess('top-end','Inversion cargada',false,2000);

        this.activarModalNuevaInversion = false;
        
        this.cerrarModal();
        
        // this.router.navigate(['/dashboard/ventas']);
      } else {
        this.alertaService.alertFail('Ocurrio un error',false,2000);
      }
      return;
     },
    error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
  });
}

// ==============================
// 
// ================================
alta_inversor() {

  if(this.apellidos_alta_inversor == '')
  {
    this.alertaService.alertFail('Debe cargar un apellido para el inversor',false,2000);
    return;
  }

  if(this.nombres_alta_inversor == '')
  {
    this.alertaService.alertFail('Debe cargar un nombre para el inversor',false,2000);
    return;
  }


 const inversor = new Array(
   this.apellidos_alta_inversor,
   this.nombres_alta_inversor,
   this.dni_alta_inversor,
   this.telefono_alta_inversor,
   this.email_alta_inversor,
   this.observaciones_alta_inversor,
   this.fecha_nac_alta_inversor
 );

 this.inversoresService.altaInversor( inversor )
 .subscribe( {
   next: (resp: any) => {

     if ( resp[0][0].mensaje == 'ok') {

       this.buscarInversores();
       this.alertaService.alertSuccess('top-end','Inversor cargado',false,2000);
       let el: HTMLElement = this.divCerrarModalAltaInversor.nativeElement;
       el.click();

     } else {
       this.alertaService.alertFailWithText('Ocurrio un error al cargar los datos del inversor',resp[0][0].mensaje,false,1000);
     }
    
     // cerrar modal
     return;

   },
   error: (err: any) => {
     this.alertaService.alertFailWithText('Ocurrio un error al cargar los datos del inversor',err,false,1000); 
   }
});

}

// ==================================================
// 
// ==================================================

bajaInversor(IdPersona: string) {

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
            this.buscarInversores();
            
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

  if ( desde >= this.totalInversores ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarInversores();

}
  // ==============================
  // 
  // ================================
  cerrarModal(){
    let el: HTMLElement = this.divCerrarModal.nativeElement;
    el.click();
  }
// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde

  const inputElement: HTMLInputElement = document.getElementById('inversorBuscado') as HTMLInputElement;
  inputElement.value = '';
  
  this.desde = 0;
  this.buscarInversores();
}


}
