import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styles: []
})
export class PromocionesComponent implements OnInit {

  promociones!: any;
  totalPromociones = 0;
  desde = 0;

  constructor(
    public productosService: ProductosService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarPromociones();
  }

// ==================================================
// Carga
// ==================================================

cargarPromociones() {

    this.productosService.listarPromocionesPaginado( this.desde  )
               .subscribe( {
                next: (resp: any) => { 
          
                  if(resp[2][0].mensaje == 'Ok') {
                    this.totalPromociones = resp[1][0].cantPromociones;

                    this.promociones = resp[0];
                    
                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,400);
                    
                  }
                 },
                error: () => {  this.alertaService.alertFail('Ocurrio un error',false,400); }
              });



  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalPromociones ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarPromociones();

}


// =================================================================
publicarPromocion(IdPromocion: string){ 

  this.productosService.publicarPromocion( IdPromocion  )
  .subscribe( {
   next: (resp: any) => {

    console.log("resp promo ",resp)

     if ( resp[0][0].mensaje == 'Ok') {       
      this.alertaService.alertSuccess('top-end','Operacion exitosa',false,900);
     } else {
       this.alertaService.alertFail('Ocurrio un error',false,2000);
     }
     return;
    },
   error: (err: any) => { 
    this.alertaService.alertFail('Ocurrio un error',false,2000) 
  
  }
 });

}

// ==================================================
// 
// ==================================================

bajaPromocion(IdPromocion: string) {

  Swal.fire({
    title: '¿Desea eliminar la promocion?',
    text: "Eliminacion de promocion",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.productosService.bajaPromocion( IdPromocion )
      .subscribe({
        next: (resp: any) => { 

  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Promocion dado de baja',false,900);
            this.cargarPromociones();
            
          } else {
            this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })
}

}
