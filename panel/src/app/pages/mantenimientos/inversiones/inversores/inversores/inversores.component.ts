import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { InversoresService } from 'src/app/services/inversores.service';
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


  constructor(
    public inversoresService: InversoresService,
    private alertService: AlertService,
    public authService: AuthService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
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
//        Cambio de valor
// ==================================================

altaMontoInversion(){

  this.IdPersona = this.authService.IdPersona;

  if ( this.monto <= 0 ) {
    this.alertaService.alertFail('Monto invalido',false,2000);
    return;
  }

  const datosNuevaInversion = [
    this.IdPersona,
    this.monto
  ]

  this.inversoresService.altaMontoInversion( datosNuevaInversion )
  .subscribe({
    next: (resp: any) => {

      if ( resp[0][0].mensaje == 'Ok') {
        this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);

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

}
