import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IItemStructure } from 'src/app/interfaces/item.interface';
import { IItemTipoPagoStructure } from 'src/app/interfaces/item_tp.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import { NgbdModalBasic } from './modal-forma-pago/modal-forma-pago.component';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: []
})
export class NuevaVentaComponent implements OnInit {

  forma!: FormGroup;
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

    this.forma = new FormGroup({
      IdCategoria: new FormControl(null, Validators.required ),
      IdMarca: new FormControl(null, Validators.required),
      IdSubCategoria: new FormControl(null, Validators.required ),
      IdUnidad: new FormControl(null, Validators.required ),
      Producto: new FormControl(null, Validators.required),
      Codigo: new FormControl(null, Validators.required ),
      Stock: new FormControl(null, Validators.required ),
      FechaVencimiento: new FormControl(null, Validators.required ),
      Imagen: new FormControl(null, Validators.required ),
      Descripcion: new FormControl(null, Validators.required ),
      StockAlerta: new FormControl(null, Validators.required ),
      Peso: new FormControl(null, Validators.required ),
      Sabor: new FormControl(null, Validators.required ),
      PrecioCompra: new FormControl(null, Validators.required ),
      PrecioVenta: new FormControl(null, Validators.required ),
      PrecioMayorista: new FormControl(null, Validators.required ),
      PrecioMeli: new FormControl(null, Validators.required ),
      Descuento: new FormControl(null, Validators.required ),
      Cantidad: new FormControl(null, Validators.required )   // sin uso
      });
  }
  
// ==================================================
//        Crear 
// ==================================================

altaVenta() {

  // this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdProducto');
  this.IdPersona = this.authService.IdPersona;

      if ( this.forma.invalid ) {
        return;
      }

      // Comprobar que la suma de los tipos de pago sea igual al total final

      const venta = new Array(
        this.forma.value.IdCliente,
        this.forma.value.IdPersona,  // Id del vendedor
        this.forma.value.IdCliente,
        this.lineas_venta,
        this.lineas_tipos_pago
      );

      console.log("venta es : ",venta)

      // this.ventasService.altaVenta( venta )
      //           .subscribe( (resp: any) => {
      //             console.log("resp en plan es : ",resp)
      //             if ( resp.Mensaje === 'Ok') {
      //               this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);
                    
      //               this.router.navigate(['/dashboard/ventas']);
      //             } else {
      //               this.alertaService.alertFail('Venta cargada',false,2000);
      //             }
      //             return;
      //           });


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

  this.lineas_venta.push(
    {
      IdItem: this.IdItem,
      IdProducto: this.itemPendiente.IdProducto,
      Codigo: this.itemPendiente.Codigo,
      Producto: this.itemPendiente.Producto,
      Cantidad: this.cantidadLineaVenta,
      PrecioVenta: this.itemPendiente.PrecioVenta,
    }
  );

  this.IdItem += 1;

  this.cantidadLineaVenta = 1;

}
// ==================================================
// Carga
//  
// ==================================================
agregarLineaTipoPago() {
  
  // this.totalVenta += Number(this.itemPendiente.PrecioVenta) * this.cantidadLineaVenta;

  // obtener el valor actual del select
  // obtener el valor actual del monto

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

  console.log("linea tp es : ",this.lineas_tipos_pago)

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
}
