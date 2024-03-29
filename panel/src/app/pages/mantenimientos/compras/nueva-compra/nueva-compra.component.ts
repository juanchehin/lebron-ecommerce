import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItemLineaCompraStructure } from 'src/app/interfaces/item-linea-compra.interface';
import { IItemStructure } from 'src/app/interfaces/item.interface';
import { IItemTipoPagoStructure } from 'src/app/interfaces/item_tp.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComprasService } from 'src/app/services/compras.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrls: ['./nueva-compra.component.css']
})
export class NuevaCompraComponent implements OnInit {

  keywordProducto = 'codigoproductosabor';
  cargando = true;
  activarModal = false;
  productos: any;
  proveedorBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  lineas_compra: IItemLineaCompraStructure[] = [];
  checkExists: IItemStructure[] = [];
  lineas_tipos_pago: IItemTipoPagoStructure[] = [];  
  itemPendiente: any = [];
  FinalformData!: FormData;

  tiposPago: any;
  comprobante_venta: any;
  currentDate = new Date();
  datosVendedor: any;
  totalCompra: number = 0;
  cantidadLineaCompra = 1;
  IdItem = 0;
  IdItemTipoPago = 0;
  IdTipoPagoSelect = 0;
  monto = 0;
  descripcion: any;
  fecha_compra: any;
  totalTiposPago = 0;
  arrayCompra: any = [];
  itemCheckExists: any = 0;
  itemIdProducto: any;
  @ViewChild('productosReference') productosReference: any;

  // proveedores
  keywordProveedor = 'nom_proveedor';
  itemPendienteProveedor: any = [];
  proveedores: any;


  //
  proveedor_alta_proveedor: any;
  apellidos_alta_proveedor: any;
  nombres_alta_proveedor: any;
  telefono_alta_proveedor: any;
  cuil_alta_proveedor: any;
  email_alta_proveedor: any;
  observaciones_alta_proveedor: any;
  @ViewChild('divCerrarModalAltaProveedor') divCerrarModalAltaProveedor!: ElementRef<HTMLElement>;


  constructor(
    public productosService: ProductosService, 
    public comprasService: ComprasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public proveedoresService: ProveedoresService,
    public alertaService: AlertService,
    private utilService: UtilService
    ) {    
  }

  ngOnInit() {   
    this.fecha_compra = this.utilService.formatDateNow(new Date(Date.now()));
    this.IdPersona = this.authService.IdPersona;
  }
  
// ==================================================
//        Crear 
// ==================================================

altaCompra() {

    if(isNaN(this.totalCompra) || this.totalCompra == null)
    {
      this.alertaService.alertFailWithText('Error','Ocurrio un problema con el total de la compra',false,1200);
      return;
    }

      this.arrayCompra.push(        
        this.lineas_compra,
        this.totalCompra,
        this.descripcion
      );

      this.comprasService.altaCompra(  this.arrayCompra )
      .subscribe({
        next: (resp: any) => { 
  
          if ( resp.Mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Compra cargada',false,2000);

            this.lineas_tipos_pago = [];
            this.lineas_compra = [];
            this.totalCompra = 0;
            this.totalTiposPago = 0;
            this.descripcion = '-';
            
          } else {
            this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
          }
          return;
         },
        error: () => { this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000) }
      });

}

// ==================================================
// Carga
// ==================================================

cargarProductos() {

  if(this.productoBuscado == '' || this.productoBuscado == null){
    return;
  }

  this.productosService.cargarProductos( this.productoBuscado , -1)
  .subscribe({
    next: (resp: any) => { 

        this.productos = resp[0];
        
     },
    error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
  });

}

  
// ==================================================
// 
// ==================================================

agregarLineaCompra() {

  if(isNaN(Number(this.cantidadLineaCompra)))
  { 
    this.alertaService.alertFailWithText('Atencion','Problema con la cantidad',false,2000);
    return;
  }

  if(this.itemPendiente.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un producto en el buscador',false,2000);
    return;
  }

  this.totalCompra += Number(this.itemPendiente.precio_venta) * this.cantidadLineaCompra;

  const checkExistsLineaCompra = this.lineas_compra.find((linea_compra) => {
    return linea_compra.IdProductoSabor == this.itemPendiente.id_producto_sabor;
  });

  if(!(checkExistsLineaCompra != undefined))
  {
    this.lineas_compra.push(
      {
        IdItem: this.IdItem,
        IdProductoSabor: Number(this.itemPendiente.id_producto_sabor),
        Codigo: this.itemPendiente.codigo,
        Producto: this.itemPendiente.producto,
        Cantidad: this.cantidadLineaCompra,
        PrecioVenta: this.itemPendiente.precio_venta,
      }
    );
  
    this.IdItem += 1;
  
    this.cantidadLineaCompra = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaCompra;
    this.itemIdProducto = this.itemCheckExists.IdProductoSabor;


    for (let item of this.lineas_compra) {
      if(item.IdProductoSabor == this.itemCheckExists.IdProductoSabor)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaCompra);
      }
     }
  }

  this.itemPendiente = [];
  this.productosReference.clear();
  this.productosReference.close();
 

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
  // Para proveedores *
  // ================================
  buscar_proveedor_automplete(){

    this.proveedoresService.buscar_proveedores_autocomplete(  this.proveedorBuscado )
    .subscribe({
      next: (resp: any) => { 
        console.log('resp::: ', resp);

        if ( resp[1][0].mensaje == 'ok') {

                this.proveedores = resp[0];
          
        } else {
          this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
        }
        return;
       },
      error: () => { this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000) }
    });
  }

  selectEventProveedor(item: any) {
    
    this.itemPendienteProveedor = item;
  }

  onChangeSearchProveedor(val: any) {
    this.proveedorBuscado = val;
    this.buscar_proveedor_automplete();
  }
  
  onFocusedProveedor(e: any){
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


    this.altaCompra();
  }
// ==============================
  // 
  // ================================
  eliminarItemCompra(IdProductoSabor: any){

    this.lineas_compra.forEach( (item, index) => {
      if(item.IdProductoSabor === IdProductoSabor) 
      {
        this.totalCompra -= item.PrecioVenta * item.Cantidad;
        this.lineas_compra.splice(index,1);
      }

      if(this.totalCompra <= 0){
        this.totalCompra = 0;
      }
        
    });

  }

  // ==================================================
//         
// ==================================================

alta_proveedor() {
  
  const proveedor = new Array(
    this.proveedor_alta_proveedor,
    this.cuil_alta_proveedor,
    this.telefono_alta_proveedor,
    this.observaciones_alta_proveedor,
    this.apellidos_alta_proveedor,
    this.nombres_alta_proveedor,
    this.email_alta_proveedor
  );

  this.proveedoresService.altaProveedor( proveedor )
            .subscribe( (resp: any) => {
              
      if ( resp[0][0].mensaje === 'Ok') {

        this.alertaService.alertSuccess('top-end','Proveedor cargado',false,2000);
        
        let el: HTMLElement = this.divCerrarModalAltaProveedor.nativeElement;
        el.click();

      } else {
        this.alertaService.alertFailWithText('Ocurrio un error',resp.mensaje,false,2000);
      }
      return;
    });

}


  // ==============================
  // Comprobante PDF
  // ================================

  onFileSelected(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.comprobante_venta = event.target.files[0];

      this.FinalformData = new FormData();
      this.FinalformData.append('comprobante_compra', this.comprobante_venta, this.comprobante_venta.name);
    }else{
      this.alertaService.alertFail('Ocurrio un error al cargar el comprobante ',false,1000);
    }

  }
}

