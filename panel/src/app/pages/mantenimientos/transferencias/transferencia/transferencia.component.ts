import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SucursalesService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styles: []
})
export class TransferenciaComponent implements OnInit {

  cargando = true;
  activarBusquedaProductosSucursal = false;
  fechaTransferencia = new Date();
  IdSucursalOrigen = 0;
  IdSucursalDestino = 0;
  productos: any;
  itemPendiente: any = [];
  totalTransferencia: number = 0;
  cantidadLineaTransferencia = 1;
  productoBuscado = '';
  lineas_transferencia: any = [];
  itemCheckExists: any = 0;
  itemIdProductoSabor: any;
  keywordProducto = 'codigoProductoSabor';
  sucursales: any;


  constructor(
    private alertService: AlertService,
    private sucursalesService: SucursalesService, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public alertaService: AlertService
    ) {

  }

  ngOnInit() {
    this.cargarSucursales();
  }

// ==================================================
//        Crear 
// ==================================================

  confirmarTransferencia() {

    if ( this.IdSucursalOrigen == 0 || this.IdSucursalDestino == 0) {
      this.alertaService.alertFail('Debe seleccionar sucursal origen y destino',false,2000);
      return;
    }


    if ( this.IdSucursalOrigen ==  this.IdSucursalDestino) {
      this.alertaService.alertFail('Las sucursales origen y destino deben ser diferentes',false,2000);
      return;
    }

      const transferencia = new Array(
        this.fechaTransferencia,
        this.IdSucursalOrigen,
        this.IdSucursalDestino,
        this.totalTransferencia,
        this.lineas_transferencia
      );

      this.productosService.altaTransferencia( transferencia )
      .subscribe({
        next: (resp: any) => { 
  
          console.log("resp alta trans ",resp)
                  
          if ( resp.mensaje === 'Ok') {

            this.alertService.alertSuccess('top-end','Transferencia confirmada',false,2000);
            
            // this.router.navigate(['/dashboard/proveedores']);
          } else {
            this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
          }
          return;
         },
        error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000); }
      });

}

// ==================================================
// Carga
// ==================================================

cargarProductosTranferencia() {

  
  if(this.IdSucursalOrigen > 0)
    {
      this.activarBusquedaProductosSucursal = true;
    }
    else
    {
      this.activarBusquedaProductosSucursal = false;
      return;
    }

  this.productosService.cargarProductosTranferencia( this.productoBuscado, this.IdSucursalOrigen )
             .subscribe( (resp: any) => {

              this.productos = resp[0];

            });

}
// ==================================================
// Carga
// ==================================================

cargarSucursales() {


  this.sucursalesService.listarTodasSucursales(  )
             .subscribe( (resp: any) => {

              this.sucursales = resp[0];

            });

}
// ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempeña
// ==================================================

agregarLineaTransferencia() {

  if(isNaN(Number(this.cantidadLineaTransferencia)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }

  
  if((this.itemPendiente.Stock <= 0) || (this.itemPendiente.Stock < this.cantidadLineaTransferencia))
  { 
    this.alertaService.alertFail('Stock insuficiente para ' + this.itemPendiente.Producto,false,2000);
    return;
  }
  
  this.totalTransferencia += Number(this.itemPendiente.PrecioVenta) * this.cantidadLineaTransferencia;

  const checkExistsLineaVenta = this.lineas_transferencia.find((lineas_transferencia : any) => {
    return lineas_transferencia.IdProductoSabor == this.itemPendiente.IdProductoSabor;
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_transferencia.push(
      {
        IdProductoSabor: Number(this.itemPendiente.IdProductoSabor),
        Codigo: this.itemPendiente.Codigo,
        Producto: this.itemPendiente.Producto,
        Cantidad: this.cantidadLineaTransferencia,
        PrecioVenta: this.itemPendiente.PrecioVenta
      }
    );

    this.cantidadLineaTransferencia = 1;
  }
  else{

    this.itemCheckExists = checkExistsLineaVenta;
    this.itemIdProductoSabor = this.itemCheckExists.IdProductoSabor;


    for (let item of this.lineas_transferencia) {

      if(this.itemPendiente.Stock < (Number(item.Cantidad) + Number(this.cantidadLineaTransferencia)))
      { 
        this.alertaService.alertFail('Stock insuficiente para ' + this.itemPendiente.Producto,false,2000);
        return;
      }

      if(item.IdProductoSabor == this.itemCheckExists.IdProductoSabor)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaTransferencia);
      }

      
     }
  }
 

}
// ==============================
  // 
  // ================================
  eliminarItemTransferencia(pIdProductoSabor: any){

    this.lineas_transferencia.forEach( (item: any, index: any) => {
      if(item.IdProductoSabor === pIdProductoSabor) 
      {
        this.totalTransferencia -= (item.PrecioVenta * item.Cantidad);
        this.lineas_transferencia.splice(index,1);
      }
        
    });

  }
 // ==============================
  // Para productos
  // ================================
  selectEventProducto(item: any) {
    
    this.itemPendiente = item;
  }

  onChangeSearchProducto(val: any) {
    this.productoBuscado = val;
    this.cargarProductosTranferencia();
  }
  
  onFocusedProducto(e: any){
  }
// ================================
  onChangeSucursalOrigen(IdSucursalOrigen: any) {
    console.log(IdSucursalOrigen);

    if(IdSucursalOrigen > 0)
    {
      this.activarBusquedaProductosSucursal = true;
      return;
    }
    else
    {
      this.activarBusquedaProductosSucursal = false;
      return;
    }
}

}
