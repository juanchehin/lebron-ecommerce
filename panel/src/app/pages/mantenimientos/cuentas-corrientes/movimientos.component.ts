import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styles: []
})
export class MovimientosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  filtroCliente = 4;  // Indica si es un cliente web o un cliente registrado desde el panel

  movimientos!: any;
  cantPlanes = 0;
  IdPersona: any;
  saldo = 0;

  totalMovimientos = 0;
  cargando = true;

  constructor(
    public cuentasService: CuentasService,
    private alertService: AlertService,
    public activatedRoute: ActivatedRoute
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

                  if(resp[3][0].Mensaje == 'Ok')
                  { 
                    this.saldo = resp[1][0].saldo;
    
                    this.movimientos = resp[0];

                    this.totalMovimientos = resp[2][0].cantMovimientos;
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
// 
// ==================================================

bajaCliente(IdPersona: string) {

  Swal.fire({
    title: '¿Desea eliminar el cliente?',
    text: "Eliminacion de cliente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.cuentasService.bajaCuentaCliente( IdPersona )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0].Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Cuenta dada de baja',false,900);
            this.cargarMovimientosClienteCuenta();
            
          } else {
            this.alertService.alertFail(resp[0][0].Mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].Mensaje,false,1200); }
      });
    }
  })

  
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
  // this.cargarProductos();

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


}
