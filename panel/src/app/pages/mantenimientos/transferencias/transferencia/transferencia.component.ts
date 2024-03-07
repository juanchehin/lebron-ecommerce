import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SucursalesService } from 'src/app/services/sucursal.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  cargando = true;
  activarBusquedaProductosSucursal = false;
  fechaTransferencia: any;
  IdSucursalOrigen = 0;
  IdSucursalDestino = 0;
  productos: any;
  itemPendiente: any = [];
  totalTransferencia: number = 0;
  cantidadLineaTransferencia = 1; // valor del input "cantidad"
  productoBuscado = '';
  lineas_transferencia: any = [];
  itemCheckExists: any = 0;
  itemIdProductoSabor: any;
  keywordProducto = 'codigoproductosabor';
  sucursales: any;
  cantidad_lineas_transferencias = 0; // numero de productos distintos agregador
  observaciones_alta_transferencia = '';


  constructor(
    private alertService: AlertService,
    private sucursalesService: SucursalesService, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public alertaService: AlertService,
    private utilService: UtilService
    ) {

  }

  ngOnInit() {
    this.fechaTransferencia = this.utilService.formatDateNow(new Date(Date.now()));

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
        this.lineas_transferencia,
        this.cantidad_lineas_transferencias,
        this.observaciones_alta_transferencia
      );

      this.productosService.altaTransferencia( transferencia )
      .subscribe({
        next: (resp: any) => {
          console.log('resp::: ', resp);
          
          if ( resp[0][0].mensaje === 'ok') {

            this.alertService.alertSuccess('top-end','Transferencia confirmada',false,2000);
            this.resetearVariables();
            
          } else {
            this.alertService.alertFailWithText('Ocurrio un error',resp.mensaje,false,2000);
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
              console.log('resp::: ', resp);

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

  if((this.itemPendiente.stock <= 0) || (this.itemPendiente.stock < this.cantidadLineaTransferencia))
  { 
    this.alertaService.alertInfoWithText('Atencion','Stock insuficiente para  "' + this.itemPendiente.producto + '"',false,2000);
    return;
  }
  
  this.totalTransferencia += Number(this.itemPendiente.precio_venta) * this.cantidadLineaTransferencia;

  const checkExistsLineaVenta = this.lineas_transferencia.find((lineas_transferencia : any) => {
    return lineas_transferencia.id_producto_sabor == this.itemPendiente.id_producto_sabor;
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_transferencia.push(
      {
        IdProductoSabor: Number(this.itemPendiente.id_producto_sabor),
        Codigo: this.itemPendiente.codigo,
        Producto: this.itemPendiente.producto,
        Cantidad: this.cantidadLineaTransferencia,
        PrecioVenta: this.itemPendiente.precio_venta
      }
    );

    this.cantidadLineaTransferencia = 1;
    this.cantidad_lineas_transferencias += 1;
  }
  else{

    this.itemCheckExists = checkExistsLineaVenta;
    this.itemIdProductoSabor = this.itemCheckExists.IdProductoSabor;


    for (let item of this.lineas_transferencia) {

      if(this.itemPendiente.stock < (Number(item.Cantidad) + Number(this.cantidadLineaTransferencia)))
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

    this.cantidad_lineas_transferencias -= 1;

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


  // ==============================
  // 
  // ================================
  resetearVariables(){
    this.lineas_transferencia = [];
    this.totalTransferencia = 0;
    this.cantidadLineaTransferencia = 0;
    this.cantidad_lineas_transferencias = 0;

  }
}
