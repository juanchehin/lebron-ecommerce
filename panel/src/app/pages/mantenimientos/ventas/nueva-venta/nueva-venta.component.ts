import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemStructure } from 'src/app/interfaces/item.interface';
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
  keywordProducto = 'NombreCompleto';
  cargando = true;
  activarModal = false;
  productos: any;
  clienteBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  lineas_venta: IItemStructure[] = [];
  checkExists: IItemStructure[] = [];
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
  itemIdProducto: any;


  constructor(
    private router: Router,
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

      this.arrayVenta.push(        
        this.IdCliente,
        this.lineas_venta,
        this.lineas_tipos_pago,
        this.totalVenta
      );

      console.log(" this.arrayVenta es : ", this.arrayVenta)

      this.ventasService.altaVenta(  this.arrayVenta )
      .subscribe({
        next: (resp: any) => { 
  
          console.log("resp en altaVenta es : ",resp)

          if ( resp[0][0].Mensaje === 'Ok') {
            this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);
            
            this.router.navigate(['/dashboard/ventas']);
          } else {
            this.alertaService.alertFail('Ocurrio un error',false,2000);
          }
          return;
         },
        error: () => { this.alertaService.alertFail('Venta cargada',false,2000) }
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

                // this.cargando = false;

              });

  }

// ==================================================
// 
// ==================================================
  cambiaCantidadVenta(cantidad: any) {
    
    this.cantidadLineaVenta = cantidad.data;
    
  }
  
// ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempeña
// ==================================================

agregarLineaVenta() {
  
  this.totalVenta += Number(this.itemPendiente.PrecioVenta) * this.cantidadLineaVenta;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    return linea_venta.IdProducto == this.itemPendiente.IdProducto;
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        IdItem: this.IdItem,
        IdProducto: Number(this.itemPendiente.IdProducto),
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
    this.itemIdProducto = this.itemCheckExists.IdProducto;


    for (let item of this.lineas_venta) {
      if(item.IdProducto == this.itemCheckExists.IdProducto)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaVenta);
      }
     }
  }
 

}
// ==================================================
// Carga
//  
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

  // var tipo_pago = 

    const tipo_pago = this.tiposPago.map( (item: any) => 
    {
      item.IdTipoPago = this.IdTipoPagoSelect
    }    
    
  );

  // const tipo_pago = this.tiposPago
  // .map((obj:any) => obj.TipoPago)
  // .filter((value: any) => {
  //   return value == this.IdTipoPagoSelect;
  // });

  let obj = this.tiposPago.find((o: any) => o.IdTipoPago === this.IdTipoPagoSelect);

  this.lineas_tipos_pago.push(
    {
      IdItem: this.IdItemTipoPago,
      IdTipoPago: this.IdTipoPagoSelect,
      TipoPago: obj.TipoPago,
      SubTotal: this.monto
    }
  );

  this.IdItemTipoPago += 1;

  // this.cantidadLineaVenta = 1;

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
    console.log("continuarVenta")
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
  eliminarItemVenta(IdProducto: any){

    this.lineas_venta.forEach( (item, index) => {
      if(item.IdProducto === IdProducto) 
        this.lineas_venta.splice(index,1);
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
}

