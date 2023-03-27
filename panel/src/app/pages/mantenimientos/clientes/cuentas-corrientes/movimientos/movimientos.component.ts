import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html'
})
export class MovimientosComponent implements OnInit {

  desde = 0;
  filtroCliente = 4;  // Indica si es un cliente web o un cliente registrado desde el panel
  activarModal = false;
  movimientos!: any;
  cantPlanes = 0;
  IdPersona: any;
  saldo = 0;
  totalMovimientos = 0;
  cargando = true;
  monto = 0;
  descripcion: any;
  apellidos: any;
  nombres: any;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;

  constructor(
    public cuentasService: CuentasService,
    private alertService: AlertService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarMovimientosClienteCuenta();
  }

// ==================================================
// Carga
// ==================================================

cargarMovimientosClienteCuenta() {

    this.cuentasService.cargarMovimientosClienteCuenta( this.desde , this.IdPersona )
               .subscribe( {
                next: (resp: any) => { 

                  console.log("resp mov cl : ",resp);

                  if(resp[4][0].mensaje == 'Ok')
                  { 
                    this.apellidos = resp[0][0].Apellidos;
                    this.nombres = resp[0][0].Nombres;

                    this.saldo = resp[2][0].saldo;
    
                    this.movimientos = resp[1];

                    this.totalMovimientos = resp[3][0].cantMovimientos;
                    return;
                  } else {
                    this.alertService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
              });

  }



// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalMovimientos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarMovimientosClienteCuenta();

}
// ==================================================
//   
// ==================================================

acreditar() {
  
 this.activarModal = true;
}

// ==============================
// 
// ================================
cerrarModal(){
  let el: HTMLElement = this.divCerrarModal.nativeElement;
  el.click();
}

// ==============================
// 
// ================================
guardarAcreditacion(){

  this.cuentasService.altaAcreditarCliente( this.monto , this.IdPersona ,this.descripcion )
  .subscribe( {
   next: (resp: any) => { 

    this.cerrarModal();

     if(resp.mensaje == 'Ok')
     { 
      this.alertService.alertSuccess('top-end','Registro guardado',false,2000);

      this.router.navigate(['/dashboard/cuentas'])

      return;
     } else {
       this.alertService.alertFail('Ocurrio un error',false,2000);
     }
     return;
    },
   error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
 });

  
}
}
