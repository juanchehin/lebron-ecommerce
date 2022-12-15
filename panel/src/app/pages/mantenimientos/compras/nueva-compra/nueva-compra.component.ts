import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemStructure } from 'src/app/interfaces/item.interface';
import { IItemTipoPagoStructure } from 'src/app/interfaces/item_tp.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComprasService } from 'src/app/services/compras.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrls: []
})
export class NuevaCompraComponent implements OnInit {

  keywordProveedor = 'Proveedor';
  keywordProducto = 'NombreCompleto';
  cargando = true;
  activarModal = false;
  productos: any;
  proveedorBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  lineas_compra: IItemStructure[] = [];
  checkExists: IItemStructure[] = [];
  lineas_tipos_pago: IItemTipoPagoStructure[] = [];  
  itemPendiente: any = [];
  tiposPago: any;
  proveedores = [];
  currentDate = new Date();
  datosVendedor: any;
  totalCompra: number = 0;
  cantidadLineaCompra = 1;
  IdItem = 0;
  IdItemTipoPago = 0;
  IdTipoPagoSelect = 0;
  monto = 0;
  IdProveedor = 0;
  totalTiposPago = 0;
  arrayCompra: any = [];
  itemCheckExists: any = 0;
  itemIdProducto: any;


  constructor(
    private router: Router,
    public productosService: ProductosService, 
    public comprasService: ComprasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public proveedoresService: ProveedoresService,
    public alertaService: AlertService
    ) {
    
  }

  ngOnInit() {   
    this.IdPersona = this.authService.IdPersona;
    this.cargarProveedores();
  }
  
// ==================================================
//        Crear 
// ==================================================

altaCompra() {
  // this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdProducto');
  this.IdPersona = this.authService.IdPersona;

      if ( this.totalCompra != this.totalTiposPago ) {
        this.alertaService.alertFail('Los totales no coinciden',false,2000);
        return;
      }

      this.arrayCompra.push(        
        this.IdProveedor,
        this.lineas_compra,
        this.lineas_tipos_pago,
        this.totalCompra
      );

      console.log(" this.arrayC es : ", this.arrayCompra)

      this.comprasService.altaCompra(  this.arrayCompra )
      .subscribe({
        next: (resp: any) => { 
  
          console.log("resp en alta compra es : ",resp)

          if ( resp[0][0].Mensaje === 'Ok') {
            this.alertaService.alertSuccess('top-end','Compra cargada',false,2000);

            this.activarModal = false;
            this.lineas_tipos_pago = [];
            this.lineas_compra = [];
            this.totalCompra = 0;
            this.totalTiposPago = 0;
            
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

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado )
             .subscribe( (resp: any) => {

              this.productos = resp[0];

            });

}
// ==================================================
// Carga
// ==================================================

cargarProveedores() {

  console.log("cargarProveedores")

  this.proveedoresService.listarProveedores(  )
             .subscribe( (resp: any) => {

              console.log("resp cargarProveedores es : ",resp[0])

              this.proveedores = resp[0];

          });

}

  
// ==================================================
// 
// ==================================================

agregarLineaCompra() {

  if(isNaN(Number(this.cantidadLineaCompra)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }
  
  this.totalCompra += Number(this.itemPendiente.PrecioVenta) * this.cantidadLineaCompra;

  const checkExistsLineaCompra = this.lineas_compra.find((linea_compra) => {
    return linea_compra.IdProducto == this.itemPendiente.IdProducto;
  });

  if(!(checkExistsLineaCompra != undefined))
  {
    this.lineas_compra.push(
      {
        IdItem: this.IdItem,
        IdProducto: Number(this.itemPendiente.IdProducto),
        Codigo: this.itemPendiente.Codigo,
        Producto: this.itemPendiente.Producto,
        Cantidad: this.cantidadLineaCompra,
        PrecioVenta: this.itemPendiente.PrecioVenta,
      }
    );
  
    this.IdItem += 1;
  
    this.cantidadLineaCompra = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaCompra;
    this.itemIdProducto = this.itemCheckExists.IdProducto;


    for (let item of this.lineas_compra) {
      if(item.IdProducto == this.itemCheckExists.IdProducto)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaCompra);
      }
     }
  }
 

}

  // ==============================
  // Para proveedores
  // ================================
  selectEvent(item: any) {
    this.IdProveedor = item.IdPersona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearch(val: any) {

    this.proveedorBuscado = val;
    this.cargarProveedores();
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
  continuarCompra()
  {
    // chequear que haya productos cargados y el total de compra sea mayor que cero
    if(this.lineas_compra.length <= 0)
    {
      this.alertaService.alertFail('Debe cargar productos a la compra',false,2000);
      return;
    }

    if(this.totalCompra <= 0)
    {
      this.alertaService.alertFail('El total de la compra debe ser mayor que cero',false,2000);
      return;
    }

    if((Number(this.IdProveedor) <= 0) || (this.IdProveedor == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un proveedor',false,2000);
      return;
    }

    this.activarModal = true;

  }
// ==============================
  // 
  // ================================
  eliminarItemCompra(IdProducto: any){

    this.lineas_compra.forEach( (item, index) => {
      if(item.IdProducto === IdProducto) 
      {
        this.totalCompra -= item.PrecioVenta * item.Cantidad;
        this.lineas_compra.splice(index,1);
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

}

