import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos-producto',
  templateUrl: './movimientos-producto.component.html',
  styles: []
})
export class MovimientosProductosComponent implements OnInit {

  desde = 0;
  p_id_producto_sabor: any;
  movimientos_producto!: any;
  operaciones: any;
  sucursales: any;
  cant_movimientos = 0;
  id_sucursal_seleccionada = 0;
  id_operacion_seleccionada = 0;

  fecha_inicio = this.utilService.formatDateNow(new Date(Date.now()));
  fecha_fin = this.utilService.formatDateNow(new Date(Date.now()));

  constructor(
    public productosService: ProductosService,
    public activatedRoute: ActivatedRoute,
    public alertaService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.p_id_producto_sabor = this.activatedRoute.snapshot.paramMap.get('IdProducto');
    this.listar_movimientos_producto();
  }

// ==================================================
// Carga
// ==================================================

listar_movimientos_producto() {

    this.productosService.listar_movimientos_producto( this.fecha_inicio, this.fecha_fin, this.p_id_producto_sabor, this.id_sucursal_seleccionada, this.id_operacion_seleccionada, this.desde  )
               .subscribe( {
                next: (resp: any) => {

                  if(resp.length <= 0)
                  { 
                    this.movimientos_producto = [];
                    this.cant_movimientos = 0;
                    
                    return;
                  }
  
                  if ( resp[4][0].mensaje == 'ok') {
                    
                    this.cant_movimientos = resp[1][0].cant_movimientos;
                    this.operaciones = resp[2];
                    this.sucursales = resp[3];
                    this.movimientos_producto = resp[0];
                    
                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000)
                }
              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.cant_movimientos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_movimientos_producto();

}


// ==================================================
// 
// ==================================================

baja_transaccion(id_transaccion: string) {

  Swal.fire({
    title: '¿Desea eliminar el movimiento?',
    text: "Eliminacion de movimiento",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.productosService.bajaProducto( id_transaccion )
      .subscribe({
        next: (resp: any) => { 

  
          if(resp[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Movimiento dado de baja',false,900);
            this.listar_movimientos_producto();
            
          } else {
            this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })
}

// ==================================================
// 
// ==================================================

refrescar() {

  this.desde = 0;

  this.listar_movimientos_producto();

}

}
