import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItemVentaStructure } from 'src/app/interfaces/item-venta.interface';
import { IItemTipoPagoStructure } from 'src/app/interfaces/item_tp.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: []
})
export class NuevaVentaComponent implements OnInit {

  keywordCliente = 'NombreCompleto';
  keywordProducto = 'codigoProductoSabor';
  cargando = true;
  activarModal = false;
  productos: any;
  clienteBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  lineas_venta: IItemVentaStructure[] = [];
  checkExists: IItemVentaStructure[] = [];
  lineas_tipos_pago: IItemTipoPagoStructure[] = [];  
  itemPendiente: any = [];
  tiposPago: any;
  clientes = [];
  currentDate = new Date();
  datosVendedor: any;
  totalVenta: number = 0;
  cantidadLineaVenta = 1;
  IdItem = 0;
  IdItemTipoPago = 0;
  IdTipoPagoSelect = 0;
  monto = 0;
  IdCliente = 0;
  totalTiposPago = 0;
  arrayVenta: any = [];
  itemCheckExists: any = 0;
  itemIdProductoSabor: any;
  idSucursalVendedor: any;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;


  constructor(
    public productosService: ProductosService, 
    public ventasService: VentasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public clientesService: ClientesService,
    public marcasService: MarcasService,
    public alertaService: AlertService
    ) {
    
  }

  ngOnInit() {   
    this.IdPersona = this.authService.IdPersona;
    this.cargarDatosVendedor();    

  }
  
// ==================================================
//        Crear 
// ==================================================

altaVenta() {
  console.log("altaVenta")
  // this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdProducto');
  this.IdPersona = this.authService.IdPersona;

      if ( this.totalVenta != this.totalTiposPago ) {
        this.alertaService.alertFail('Los totales no coinciden',false,2000);
        return;
      }
      console.log("altaVenta 2")
      this.arrayVenta.push(        
        this.IdCliente,
        this.lineas_venta,
        this.lineas_tipos_pago,
        this.totalVenta
      );

      console.log("altaVenta 3 ",this.arrayVenta); 

      this.ventasService.altaVenta(  this.arrayVenta )
      .subscribe({
        next: (resp: any) => { 
  
          console.log("erws resp : ",resp)

          if ( resp[0][0].Mensaje === 'Ok') {
            this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);

            this.activarModal = false;
            this.lineas_tipos_pago = [];
            this.lineas_venta = [];
            this.cerrarModal();
            this.totalVenta = 0;
            this.totalTiposPago = 0;
            
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
// Carga
// ==================================================

cargarClientes() {

    this.clientesService.cargarClientes( this.clienteBuscado )
               .subscribe( (resp: any) => {

                this.clientes = resp;

              });

  }

// ==================================================
// Autocompletar de productos
// ==================================================

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado, this.idSucursalVendedor )
             .subscribe( (resp: any) => {

              this.productos = resp[0];

            });

}
// ==================================================
// Carga
// ==================================================
cargarTiposPago() {

  this.ventasService.cargarTiposPago( )
             .subscribe( (resp: any) => {
              
              this.tiposPago = resp[0];
            });

}
  // ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempeña
// ==================================================

cargarDatosVendedor() {
  
    this.usuariosService.cargarDatosVendedor(  this.IdPersona )
               .subscribe( (resp: any) => {

                this.datosVendedor = resp[0][0];

                this.idSucursalVendedor = this.datosVendedor.IdSucursal;

              });

  }

// ==================================================
// 
// ==================================================
  cambiaCantidadVenta(cantidad: any) {
    
    // this.cantidadLineaVenta = cantidad.data;
    
  }
  
// ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempeña
// ==================================================

agregarLineaVenta() {

  if(isNaN(Number(this.cantidadLineaVenta)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }

  if((this.itemPendiente.Stock <= 0) || (this.itemPendiente.Stock < this.cantidadLineaVenta))
  { 
    this.alertaService.alertFail('Stock insuficiente para ' + this.itemPendiente.Producto,false,2000);
    return;
  }

  this.totalVenta += Number(this.itemPendiente.PrecioVenta) * this.cantidadLineaVenta;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    return linea_venta.IdProductoSabor == this.itemPendiente.IdProductoSabor;
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        IdItem: this.IdItem,
        IdProductoSabor: Number(this.itemPendiente.IdProductoSabor),
        Codigo: this.itemPendiente.Codigo,
        Producto: this.itemPendiente.Producto,
        Cantidad: this.cantidadLineaVenta,
        PrecioVenta: this.itemPendiente.PrecioVenta,
      }
    );
  
    this.IdItem += 1;
  
    this.cantidadLineaVenta = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;
    this.itemIdProductoSabor = this.itemCheckExists.IdProductoSabor;


    for (let item of this.lineas_venta) {
      if(item.IdProductoSabor == this.itemCheckExists.IdProductoSabor)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaVenta);
      }
     }
  }
 

}
// ==================================================
// Carga
// ==================================================
agregarLineaTipoPago() {
  
  if(this.monto > this.totalVenta)
  {
    this.alertaService.alertFail('El monto es mayor que el total de la venta',false,2000);
    return;
  }

  this.totalTiposPago += +this.monto;

  if(this.totalTiposPago > this.totalVenta)
  {
    this.alertaService.alertFail('El monto total es mayor que el total de la venta',false,2000);
    this.totalTiposPago -= +this.monto;
    return;
  }

  if((Number(this.monto) <= 0) || (this.monto == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un monto',false,2000);
      return;
    }

  let obj = this.tiposPago.find((o: any) => 
    {
      if(o.IdTipoPago == this.IdTipoPagoSelect)
      {
        return o;
      }
    }
  );

  this.lineas_tipos_pago.push(
    {
      IdItem: this.IdItemTipoPago,
      IdTipoPago: this.IdTipoPagoSelect,
      TipoPago: obj.TipoPago,
      SubTotal: this.monto
    }
  );

  this.IdItemTipoPago += 1;

}
  // ==============================
  // Para clientes
  // ================================
  selectEvent(item: any) {
    this.IdCliente = item.IdPersona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearch(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.clienteBuscado = val;
    this.cargarClientes();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // console.log("pasa on onFocused",e)
    // do something when input is focused
  }

  // ==============================
  // Para productos
  // ================================
  selectEventProducto(item: any) {
    
    this.itemPendiente = item;
  }

  onChangeSearchProducto(val: any) {
    if(val == '' || val == null)
    {
      return;
    }
    this.productoBuscado = val;
    this.cargarProductos();
  }
  
  onFocusedProducto(e: any){
  }

  // ==============================
  // 
  // ================================
  continuarVenta()
  {
    // chequear que haya productos cargados y el total de venta sea mayor que cero
    if(this.lineas_venta.length <= 0)
    {
      this.alertaService.alertFail('Debe cargar productos a la venta',false,2000);
      return;
    }

    if(this.totalVenta <= 0)
    {
      this.alertaService.alertFail('El total de la venta debe ser mayor que cero',false,2000);
      return;
    }

    if((Number(this.IdCliente) <= 0) || (this.IdCliente == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un cliente',false,2000);
      return;
    }

    this.activarModal = true;

    this.cargarTiposPago();
  }
// ==============================
  // 
  // ================================
  eliminarItemVenta(IdProductoSabor: any){

    this.lineas_venta.forEach( (item, index) => {
      if(item.IdProductoSabor === IdProductoSabor) 
      {
        this.totalVenta -= item.PrecioVenta * item.Cantidad;
        this.lineas_venta.splice(index,1);
      }
        
    });

  }

  // ==============================
  // 
  // ================================
  eliminarItemTipoPago(IdItem: any){

    this.lineas_tipos_pago.forEach( (item, index) => {
      if(item.IdItem === IdItem) 
      {
        this.totalTiposPago -= +item.SubTotal;
        this.lineas_tipos_pago.splice(index,1);
      }
        
    });

  }

  // ==============================
  // 
  // ================================
  cerrarModal(){
    let el: HTMLElement = this.divCerrarModal.nativeElement;
    el.click();
  }

  onChangeTipoPago(val: any){
    this.IdTipoPagoSelect = val;
  }
}

