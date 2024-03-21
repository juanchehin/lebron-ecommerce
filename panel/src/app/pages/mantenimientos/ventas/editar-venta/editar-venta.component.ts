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
import { UtilService } from '../../../../services/util.service';

@Component({
  selector: 'app-editar-venta',
  templateUrl: './editar-venta.component.html',
  styleUrls: ['./editar-venta.component.css']
})
export class EditarVentaComponent implements OnInit {

  currentDate = new Date();

  keywordCliente = 'NombreCompleto';
  keywordProducto = 'codigoproductosabor';

  descuentoEfectivo: any = 0;
  productos: any;
  clienteBuscado = '';
  productoBuscado = '';
  id_sucursal_seleccionada = 1;
  id_operacion_seleccionada = 2;
  local = '';
  lineas_venta: IItemVentaStructure[] = [];
  checkExists: IItemVentaStructure[] = [];
  lineas_tipos_pago: IItemTipoPagoStructure[] = [];  
  itemPendiente: any = [];
  tiposPago: any;
  clientes = [];
  datosVendedor: any;
  sucursales_vendedor: any;
  totalVenta: number = 0;
  cantidadLineaVenta = 1;
  IdItem = 0;
  IdItemTipoPago = 0;
  IdTipoPagoSelect = 0;
  monto = 0;
  totalTiposPagoRestante = 0;
  operaciones: any;
  cantidad_lineas_venta = 0;
  cantidad_lineas_tipo_pago = 0;

  // alta cliente
  apellidos_alta_cliente = '';
  nombres_alta_cliente = '';
  dni_alta_cliente = '';
  email_alta_cliente = '';
  telefono_alta_cliente = '';
  observaciones_alta_cliente = '';
  
  IdCliente = 0;
  arrayVenta: any = [];
  itemCheckExists: any = 0;
  itemIdProductoSabor: any;
  idSucursalVendedor: any;
  fecha_venta: any;

  //
  FinalformData!: FormData;
  comprobante_venta: any;

  // Modals
  activarModal = false;
  activarModalDescuentoEfectivo = false;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalDescuentoEfectivo') divCerrarModalDescuentoEfectivo!: ElementRef<HTMLElement>;
  @ViewChild('buttonAbrirModalDescuentoEfectivo') buttonAbrirModalDescuentoEfectivo!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalAltaCliente') divCerrarModalAltaCliente!: ElementRef<HTMLElement>;

  // =====
  porcentaje_un_pago: any;
  porcentaje_tres_pago: any;
  porcentaje_seis_pago: any;
  total_venta_inicial: any;
  porcentajeDescuentoEfectivo: any = 0;
  montoEfectivo = 0;
  totalTiposPago = 0;

  //
  id_venta: any;
  datos_venta: any;


  constructor(
    public productosService: ProductosService, 
    public ventasService: VentasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public clientesService: ClientesService,
    public marcasService: MarcasService,
    public alertaService: AlertService,
    private utilService: UtilService
    ) {
    
  }

  ngOnInit() {   
    // this.resetearVariables();
    this.id_venta = this.activatedRoute.snapshot.paramMap.get('pIdVenta');

    this.fecha_venta = this.utilService.formatDateNow(new Date(Date.now()));
    this.datosVendedor = [];
    this.cargarDatosEditarVenta();
  }
  
// ==================================================
//        Crear 
// ==================================================

editar_venta() {
  

      if ( this.totalVenta != this.totalTiposPago ) {
        this.alertaService.alertFail('Los totales no coinciden',false,2000);
        return;
      }

      if ( this.sucursales_vendedor.includes(this.id_sucursal_seleccionada) ) {
        this.alertaService.alertFailWithText('Ocurrio un problema','Hubo un problema con la sucursal',false,2000);
        return;
      }

      if ( this.operaciones.includes(this.id_operacion_seleccionada) ) {
        this.alertaService.alertFailWithText('Ocurrio un problema','Hubo un problema con las operaciones',false,2000);
        return;
      }

      this.arrayVenta.push(        
        this.IdCliente,
        this.lineas_venta,
        this.lineas_tipos_pago,
        this.cantidad_lineas_venta,
        this.cantidad_lineas_tipo_pago,
        this.totalVenta,
        this.fecha_venta,
        this.id_sucursal_seleccionada,
        this.id_operacion_seleccionada
      );

      this.ventasService.altaVenta(  this.arrayVenta, this.comprobante_venta )
      .subscribe({
        next: (resp: any) => {
          
          if ( resp[0][0].mensaje == 'ok') {
            this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);

            this.resetearVariables();
            
          } else {
            this.alertaService.alertFailWithText('Ocurrio un error',resp[0][0].mensaje,false,2000);
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
  .subscribe({
    next: (resp: any) => {
      
      this.clientes = resp;

     },
    error: () => { this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000) }
  });

  }

// ==================================================
// Autocompletar de productos
// ==================================================

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado, this.id_sucursal_seleccionada )
             .subscribe( (resp: any) => {
              
              this.productos = resp[0];

            });

}
// ==================================================
// Carga
// ==================================================
cargarTiposPago() {

  this.ventasService.cargarTiposPago( )
             .subscribe( {
              next: (resp: any) => { 

              this.tiposPago = resp[0];

              this.porcentaje_un_pago = resp[1][0].tarjeta1pagos;
              this.porcentaje_tres_pago = resp[1][0].tarjeta3pagos;
              this.porcentaje_seis_pago = resp[1][0].tarjeta6pagos;

            },
            error: (err: any) => {
              this.alertaService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
          });

}
  // ==================================================
// Carga los datos de la venta
// ==================================================

cargarDatosEditarVenta() {
  
    this.ventasService.cargarDatosEditarVenta( this.id_venta )
               .subscribe( {
                next: (resp: any) => {
                  console.log('resp::: ', resp);

                  this.datos_venta = resp[0];

                  this.id_operacion_seleccionada = this.datos_venta.id_operacion;
                  this.id_sucursal_seleccionada = this.datos_venta.id_sucursal;
                  this.totalVenta = this.datos_venta.monto_total;
                  // this.id_operacion_seleccionada = this.datos_venta.id_operacion;
                  // this.id_operacion_seleccionada = this.datos_venta.id_operacion;

                  this.lineas_venta = resp[1];

                  this.lineas_venta.forEach( (item: any, index) => {
      
                    this.cantidadLineaVenta = item.cantidad;
                    // this.codigo = item.cantidad;

                  });
                  

                  this.datosVendedor = resp[3][0];
                  this.sucursales_vendedor = resp[4];
                  this.operaciones = resp[5];
                  // this.fecha_venta = this.utilService.formatDateNow(resp[3][0].fecha_bd);

                  // this.idSucursalVendedor = this.datosVendedor.id_sucursal;
                },
                error: (err: any) => {
                  this.alertaService.alertFailWithText('Ocurrio un error al cargar los datos del vendedor',err,false,1000); 
                }
              });

  }

// ==================================================
// 
// ==================================================
  cambiaCantidadVenta(cantidad: any) {
    
    // this.cantidadLineaVenta = cantidad.data;
    
  }
  
// ==================================================
// 
// ==================================================
agregarLineaVenta() {

  if(isNaN(Number(this.cantidadLineaVenta)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }

  if((this.itemPendiente.stock <= 0) || (this.itemPendiente.stock < this.cantidadLineaVenta))
  { 
    this.alertaService.alertInfoWithText('Atencion','Stock insuficiente para "' + this.itemPendiente.producto + '"',false,2500);
    return;
  }

  if(this.itemPendiente.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un producto en el buscador',false,2000);
    return;
  }
  
  this.totalVenta += Number(this.itemPendiente.precio_venta) * this.cantidadLineaVenta;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    return linea_venta.IdProductoSabor == this.itemPendiente.id_producto_sabor;
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        IdItem: this.IdItem,
        IdProductoSabor: Number(this.itemPendiente.id_producto_sabor),
        Codigo: this.itemPendiente.codigo,
        Producto: this.itemPendiente.producto,
        Cantidad: this.cantidadLineaVenta,
        PrecioVenta: this.itemPendiente.precio_venta,
        SubTotal: Number(this.itemPendiente.precio_venta) * this.cantidadLineaVenta
      }
    );
  
    this.IdItem += 1;
    this.cantidad_lineas_venta += 1;
  
    this.cantidadLineaVenta = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;
    this.itemIdProductoSabor = this.itemCheckExists.IdProductoSabor;


    for (let item of this.lineas_venta) {

      if(this.itemPendiente.stock < (Number(item.Cantidad) + Number(this.cantidadLineaVenta)))
      { 
        this.alertaService.alertFail('Stock insuficiente para ' + this.itemPendiente.producto,false,2000);
        return;
      }

      if(item.IdProductoSabor == this.itemCheckExists.IdProductoSabor)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaVenta);
        item.SubTotal = Number(item.SubTotal) + ( Number((this.itemPendiente.precio_venta)) * (Number(this.cantidadLineaVenta)));

      }
     }
  }

}
// ==================================================
// Carga
// ==================================================
agregarLineaTipoPago(): any {
  var bandera = false;
  
  if(this.monto > this.totalVenta)
  {
    this.alertaService.alertFail('El monto es mayor que el total de la venta',false,2000);
    return;
  }
  

  if((this.totalTiposPago + +this.monto) > this.totalVenta)
  {
    this.alertaService.alertFail('El monto total es mayor que el total de la venta',false,2000);
    return;
  }

  if((Number(this.monto) <= 0) || (this.monto == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un monto',false,2000);
      return;
    }

  //
  let obj = this.tiposPago.find((o: any) => 
    {
      if(o.id_tipo_pago == this.IdTipoPagoSelect)
      {
        return o;
      }
    }
  );

  // Busco si ya existe el IdTipoPago en el array de lineas_tipos_pago
  let exists_ltp = this.lineas_tipos_pago.find((ltp_item: any) => 
  {
      if(ltp_item.IdTipoPago == this.IdTipoPagoSelect)
      { // linea_tipo_pago existente
        // No suma el subtotal en caso de ser con tarjeta en cuotas
        if((ltp_item.IdTipoPago == 8) || (ltp_item.IdTipoPago == 9) || (ltp_item.IdTipoPago == 10))
        {
          bandera = true;
        }else
        {
          return ltp_item;
        }
      }else{
        if(
            ((this.IdTipoPagoSelect == 8) || (this.IdTipoPagoSelect == 9) || (this.IdTipoPagoSelect == 10))
            &&
            ((ltp_item.IdTipoPago == 8) || (ltp_item.IdTipoPago == 9) || (ltp_item.IdTipoPago == 10)) 
          )
          {
            bandera = true;
          }
      }
    }
  );

  if(!bandera)
  {    
    // SI existe el tipo pago en lineas_tipos_pago
    if(exists_ltp)
    {
        exists_ltp.SubTotal = +exists_ltp.SubTotal + +this.monto;
        this.totalTiposPago = this.totalTiposPago + +this.monto;  
        this.totalTiposPagoRestante = this.totalVenta - +this.totalTiposPago;

        return;
    }else
    {
      

      this.lineas_tipos_pago.push(
        {
            IdItem: this.IdItemTipoPago,
            IdTipoPago: this.IdTipoPagoSelect,
            TipoPago: obj.tipo_pago,
            SubTotal: this.monto
        });

      switch (obj.id_tipo_pago) {
        case 1: // Pago efectivo
            this.montoEfectivo = this.monto;
            this.abrirModalDescuentoEfectivo();
            this.totalTiposPago = this.totalTiposPago + +this.monto;  
            break;
        case 8: // 1 pago
            var monto_aumento = +this.monto * ((this.porcentaje_un_pago / 100)); 
            this.totalVenta = +this.totalVenta + +monto_aumento;
            this.totalTiposPago = this.totalTiposPago + +this.monto + monto_aumento;
           
            this.lineas_tipos_pago.push(
            {
                  IdItem: this.IdItemTipoPago,
                  IdTipoPago: 12,
                  TipoPago: 'Recargo Tarjeta',
                  SubTotal: monto_aumento
            });

            break;
        case 9: // 3 pago            
            var monto_aumento = +this.monto * ((this.porcentaje_tres_pago / 100)); 
            this.totalVenta = +this.totalVenta + +monto_aumento;
            this.totalTiposPago = this.totalTiposPago + +this.monto + monto_aumento;

            this.lineas_tipos_pago.push(
            {
                  IdItem: this.IdItemTipoPago,
                  IdTipoPago: 12,
                  TipoPago: 'Recargo Tarjeta',
                  SubTotal: monto_aumento
            });

            break;
        case 10:  // 6 pago
            var monto_aumento = +this.monto * (this.porcentaje_seis_pago / 100);  
            this.totalVenta = +this.totalVenta + +monto_aumento;
            this.totalTiposPago = this.totalTiposPago + +this.monto + monto_aumento;

            this.lineas_tipos_pago.push(
            {
                  IdItem: this.IdItemTipoPago,
                  IdTipoPago: 12,
                  TipoPago: 'Recargo Tarjeta',
                  SubTotal: monto_aumento
            });

            break;
        default:
            this.totalTiposPago = +this.totalTiposPago + +this.monto;
            break;
      }
      
      this.totalTiposPagoRestante = this.totalVenta - +this.totalTiposPago;

      this.IdItemTipoPago += 1;
      this.cantidad_lineas_tipo_pago += 1;

    }

  }else{
    this.alertaService.alertFail('No puede agregar dos tipos de pago con tarjeta',false,3000);
  }

  this.monto = 0;


}
  // ==============================
  // Para clientes
  // ================================
  selectEvent(item: any) {
    this.IdCliente = item.id_persona;
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

  // ==============================
  //
  // ================================
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
  // Comprobante PDF
  // ================================

  onFileSelected(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.comprobante_venta = event.target.files[0];

      this.FinalformData = new FormData();
      this.FinalformData.append('comprobante_venta', this.comprobante_venta, this.comprobante_venta.name);
    }else{
      this.alertaService.alertFail('Ocurrio un error al cargar el comprobante ',false,1000);
    }

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

    this.total_venta_inicial = this.totalVenta;
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
        
        this.totalVenta -= item.PrecioVenta * item.Cantidad;  // precio_unitario * cantidad
        
        if(this.totalVenta <= 0){
          this.totalVenta = 0;
        }
        this.lineas_venta.splice(index,1);
      }
        
    });

    this.cantidad_lineas_venta -= 1;

  }

  // ==============================
  // 
  // ================================
  eliminarItemTipoPago(IdItem: any){

    this.lineas_tipos_pago.forEach( (item, index) => {
      if(item.IdItem === IdItem) 
      {
        this.lineas_tipos_pago.splice(index,1);

        if(item.IdTipoPago != 11)
        {
          this.totalTiposPago -= +item.SubTotal;
        }else{
          this.totalTiposPago += +item.SubTotal;
        }
        
        this.totalVenta = this.total_venta_inicial;
        this.totalTiposPagoRestante = this.totalVenta - +this.totalTiposPago;

      }

    });

    this.cantidad_lineas_tipo_pago -= 1;

  }

  // ==============================
  // 
  // ================================
  cerrarModalDescuentoEfectivo(){
    let el: HTMLElement = this.divCerrarModalDescuentoEfectivo.nativeElement;
    el.click();
  }

  onChangeTipoPago(val: any){
    this.IdTipoPagoSelect = val;
  }

  onChangeSucursal(val: any){
    this.id_sucursal_seleccionada = val;
  }

  onChangeTipoVenta(val: any){
    this.id_operacion_seleccionada = val;
  }

  // ==============================
  // 
  // ================================
  aplicarDescuentoEfectivo()
  {
    this.cerrarModalDescuentoEfectivo();
    
    if(this.porcentajeDescuentoEfectivo > 0)
    {
      let monto_descuento = (this.porcentajeDescuentoEfectivo * this.montoEfectivo / 100);
      this.totalVenta -= monto_descuento;
      this.totalTiposPago = this.totalTiposPago - monto_descuento;

      this.lineas_tipos_pago.push(
      {
            IdItem: this.IdItemTipoPago,
            IdTipoPago: 11,
            TipoPago: 'Descuento Efectivo',
            SubTotal: monto_descuento
      });

    }
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
  abrirModalDescuentoEfectivo(){
    let el: HTMLElement = this.buttonAbrirModalDescuentoEfectivo.nativeElement;
    el.click();
  }

  
// ==============================
// 
// ================================
alta_cliente() {

   if(this.apellidos_alta_cliente == '')
   {
     this.alertaService.alertFail('Debe cargar un apellido para el cliente',false,2000);
     return;
   }

   if(this.nombres_alta_cliente == '')
   {
     this.alertaService.alertFail('Debe cargar un nombre para el cliente',false,2000);
     return;
   }


  const cliente = new Array(
    this.apellidos_alta_cliente,
    this.nombres_alta_cliente,
    this.dni_alta_cliente,
    this.telefono_alta_cliente,
    this.email_alta_cliente,
    this.observaciones_alta_cliente
  );

  this.clientesService.altaCliente( cliente )
  .subscribe( {
    next: (resp: any) => {

      if ( resp[0][0].mensaje == 'Ok') {

        this.alertaService.alertSuccess('top-end','cliente cargado',false,2000);
        let el: HTMLElement = this.divCerrarModalAltaCliente.nativeElement;
        el.click();

      } else {
        this.alertaService.alertFailWithText('Ocurrio un error al cargar los datos del cliente',resp[0][0].mensaje,false,1000);
      }
     
      // cerrar modal
      return;

    },
    error: (err: any) => {
      this.alertaService.alertFailWithText('Ocurrio un error al cargar los datos del cliente',err,false,1000); 
    }
 });

}

  // ==============================
  // 
  // ================================
  resetearVariables(){
    this.descuentoEfectivo = 0;
    this.activarModalDescuentoEfectivo = false;
    this.activarModal = false;
    this.lineas_tipos_pago = [];
    this.lineas_venta = [];
    this.cerrarModal();
    this.totalVenta = 0;
    this.totalTiposPago = 0;
    this.porcentajeDescuentoEfectivo = 0;
    this.montoEfectivo = 0;

  }

}

