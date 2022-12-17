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

  forma!: FormGroup;
  cargando = true;
  fechaTransferencia: any;
  IdSucursalOrigen: any;
  IdSucursalDestino: any;
  productos: any;
  itemPendiente: any = [];
  totalTransferencia: number = 0;
  cantidadLineaTransferencia = 1;
  productoBuscado = '';
  lineas_transferencia: any = [];
  itemCheckExists: any = 0;
  itemIdProducto: any;
  keywordProducto = 'NombreCompleto';
  sucursales: any;


  constructor(
    private router: Router, 
    private alertService: AlertService,
    private sucursalesService: SucursalesService, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public alertaService: AlertService
    ) {
    activatedRoute.params.subscribe( (params: any) => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
      }

    });

  }

  ngOnInit() {
    this.cargarSucursales();
  }

// ==================================================
//        Crear 
// ==================================================

  confirmarTransferencia() {

      const transferencia = new Array(
        this.fechaTransferencia,
        this.forma.value.CUIL,
        this.forma.value.Telefono,
        this.forma.value.Observaciones,
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.Email
      );

      this.productosService.altaTransferencia( transferencia )
                .subscribe( (resp: any) => {
                  
                  if ( resp.Mensaje === 'Ok') {

                    this.alertService.alertSuccess('top-end','Transferencia confirmada',false,2000);
                    
                    this.router.navigate(['/dashboard/proveedores']);
                  } else {
                    this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                  }
                  return;
                });


              }

// ==================================================
// Carga
// ==================================================

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado )
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

              this.sucursales = resp;

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
  
  this.cantidadLineaTransferencia += Number(this.itemPendiente.PrecioVenta) * this.cantidadLineaTransferencia;

  const checkExistsLineaVenta = this.lineas_transferencia.find((lineas_transferencia : any) => {
    return lineas_transferencia.IdProducto == this.itemPendiente.IdProducto;
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_transferencia.push(
      {
        IdProducto: Number(this.itemPendiente.IdProducto),
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
    this.itemIdProducto = this.itemCheckExists.IdProducto;


    for (let item of this.lineas_transferencia) {
      if(item.IdProducto == this.itemCheckExists.IdProducto)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaTransferencia);
      }
     }
  }
 

}
// ==============================
  // 
  // ================================
  eliminarItemTransferencia(IdProducto: any){

    this.lineas_transferencia.forEach( (item: any, index: any) => {
      if(item.IdProducto === IdProducto) 
      {
        this.totalTransferencia -= item.PrecioVenta * item.Cantidad;
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
    this.cargarProductos();
  }
  
  onFocusedProducto(e: any){
  }

}
