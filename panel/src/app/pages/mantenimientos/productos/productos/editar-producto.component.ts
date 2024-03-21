import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UnidadesService } from '../../../../services/unidades.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styles: []
})
export class EditarProductoComponent implements OnInit {

  cargando = true;
  marcas: any;
  categorias: any;
  banderaGenerarCodigo = false;
  unidades: any;
  alertaPrecioVentaCompra = false;
  alertaPrecioVentaMayorista = false;
  alertaPrecioVentaMeli = false;
  sucursalPrincipal: any;
  proveedores: any;
  IdCategoriaSeleccionada: any;
  subcategorias: any;
  deshabilitarSubcategorias = true;
  alertaCodigoVacio = false;
  alertaFechaVencimiento = false;
  IdProducto: any;

  // ==============================
  IdCategoria: any;
  IdSubCategoria: any;
  IdMarca: any;
  IdUnidad: any;        
  Producto: any;
  IdProveedor: any;
  FechaVencimiento: any;
  Descripcion: any;
  StockAlerta: any;
  Medida: any;
  PrecioCompra: any;
  PrecioVenta: any;
  PrecioMayorista: any;
  PrecioMeli: any;
  Descuento: any;
  Moneda: any;
  producto: any;
  cantidad_sabores_cargados = 0;

  // sabores
  sabores: any;
  keywordSabor = 'sabor';
  sabores_cargados: any = [];
  itemPendiente: any = [];
  cantidadLineaSabor = 1;
  codigoLineaSabor: any;
  itemIdSabor: any;
  saborBuscado = '';
  itemCheckExists: any = 0;
  @ViewChild('saboresReference') saboresReference: any;
  

  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public categoriasService: CategoriasService,
    public unidadesService: UnidadesService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');
    this.cargarDatosFormEditarProducto();

  }

// ==================================================
//        Crear 
// ==================================================

editar_producto() {

      //** */
      if((this.PrecioCompra > this.PrecioVenta) ){
        this.alertaPrecioVentaCompra = true;
        return;
      }
      else
      { 
        this.alertaPrecioVentaCompra = false;
      }
      //** */
      // if(this.PrecioCompra > this.PrecioMeli)
      // {
      //   this.alertaPrecioVentaMeli = true;
      //   return;
      // }else
      // { 
      //   this.alertaPrecioVentaMeli = false;
      // }
      //** */
      if(this.PrecioCompra > this.PrecioMayorista)
      {
        this.alertaPrecioVentaMayorista = true;
        return;
      }else
      { 
        this.alertaPrecioVentaMayorista = false;
      }
       //** */
       if(this.FechaVencimiento < new Date())
       {
         this.alertaFechaVencimiento = true;
         return;
       }else
       { 
         this.alertaFechaVencimiento = false;
       }

       this.cantidad_sabores_cargados = this.sabores_cargados.length;

       if(this.cantidad_sabores_cargados <= 0 ){
        this.alertService.alertFailWithText('Ocurrio un error','Cantidad de sabores invalido',false,2000);
        return;
      }

      const productoEditado = new Array(
        this.IdProducto,
        this.IdCategoria,
        this.IdSubCategoria,
        this.IdMarca,
        this.IdUnidad,        
        this.Producto,
        this.IdProveedor,
        this.FechaVencimiento,
        this.Descripcion,
        this.StockAlerta,
        this.Medida,
        this.PrecioCompra,
        this.PrecioVenta,
        this.PrecioMayorista,
        this.PrecioMeli,
        this.Descuento,
        this.Moneda,
        this.sabores_cargados,
        this.cantidad_sabores_cargados
      );


      this.productosService.editarProducto( productoEditado )
                .subscribe( {
                  next: (resp: any) => { 
                    
                    if ( resp[0][0].mensaje === 'Ok') {
                      this.alertService.alertSuccess('top-end','Producto cargado',false,2000);
                      this.router.navigate(['/dashboard/productos']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
                });

            }

// ==================================================
// Carga
// ==================================================

cargarDatosFormEditarProducto() {

    this.productosService.cargarDatosFormEditarProducto( this.IdProducto )
               .subscribe(  {
                next: (resp: any) => { 
                  
                  if ( resp[9][0].mensaje == 'ok') {

                    this.marcas = resp[0];
                    this.categorias = resp[1];
                    this.subcategorias = resp[2];
                    this.unidades = resp[3];
                    this.proveedores = resp[4];
                    this.sucursalPrincipal = resp[5][0].Sucursal;
                    this.sabores = resp[6];
                    this.producto = resp[7][0];
                    this.sabores_cargados = resp[8];
    
                    this.IdCategoria = this.producto.id_categoria;
                    this.IdSubCategoria = this.producto.id_subcategoria;
                    this.IdMarca = this.producto.id_marca;
                    this.IdUnidad = this.producto.id_unidad;        
                    this.Producto = this.producto.producto;
                    this.IdProveedor = this.producto.id_proveedor;
                    this.FechaVencimiento = this.producto.fecha_venc;
                    this.Descripcion = this.producto.descripcion;
                    this.StockAlerta = this.producto.stock_alerta;
                    this.Medida = this.producto.medida;
                    this.PrecioCompra = this.producto.precio_compra;
                    this.PrecioVenta = this.producto.precio_venta;
                    this.PrecioMayorista = this.producto.precio_mayorista;
                    this.PrecioMeli = this.producto.precio_meli;
                    this.Descuento = this.producto.descuento;
                    this.Moneda = this.producto.moneda;

                    if((this.IdSubCategoria == 1) || ( this.subcategorias.length <= 0)){
                      this.deshabilitarSubcategorias = true;
                    }else{
                      this.deshabilitarSubcategorias = false;
                    }

                  } else {
                    this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                  }
                  return;
                 },
                error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
              });
  }

  
// ==================================================
// Carga la subcategorias segun la categoria seleccionada
// ==================================================

cargarSubcategoriaIdCategoria(IdCategoria: any) {

    this.categoriasService.cargarSubcategoriaIdCategoria( IdCategoria )
               .subscribe({
                next: (resp: any) => {
                  
                  if ( resp[2][0].mensaje == 'ok') {
                    
                      if(resp[1][0].total_subcat <= 0){
                        this.deshabilitarSubcategorias = true;    
                      }else{
                        this.deshabilitarSubcategorias = false;
                        this.subcategorias = resp[0];
                      }

                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
                  }
                  return;
                 },
                error: () => {
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
              }
              });

  }

// ==================================================
// 
// ==================================================

generarCodigo() {

  if(this.banderaGenerarCodigo == false) {
    this.codigoLineaSabor = new Date().valueOf();
  }
  else
  { 
    this.codigoLineaSabor = ''
  }

  this.banderaGenerarCodigo = !this.banderaGenerarCodigo;  
  
}
// ==================================================
// 
// ==================================================

onChangeCategorias(IdCategoria: any) {

  this.deshabilitarSubcategorias = false;
  this.cargarSubcategoriaIdCategoria(IdCategoria);
  
  
}

// ==============================
// 
// ================================
  eliminarItemSabor(id_prod_sabor: any){

    if (this.sabores_cargados.length <= 1) {
      this.alertService.alertInfoWithText('Atencion','Debe existir al menos un codigo/sabor',false,2500);
      return;
    }

    this.sabores_cargados.forEach( (item: any, index: any) => {

      if(item.id_producto_sabor == id_prod_sabor) 
      {
        this.sabores_cargados.splice(index,1);
      }
        
    });

    
    this.productosService.baja_producto_sabor( id_prod_sabor  )
    .subscribe( {
    next: (resp: any) => {

      if ( resp[0][0].mensaje == 'ok') {       
        this.alertService.alertSuccess('top-end','Sabor eliminado',false,900);
      } else {
        this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
      }
      return;
      },
    error: (err: any) => { 
      this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
    
    }
  });




  }


// ==================================================
// Insera los sabores en el array
// ==================================================

agregarLineaSabor() {

  if(this.itemPendiente.Sabor == '')
  { 
    this.alertService.alertFail('Debe elegir un sabor',false,900)
    return;
  }

  if(this.codigoLineaSabor == '' || this.codigoLineaSabor == undefined)
  { 
    this.alertService.alertFail('Debe cargar un codigo',false,900)
    return;
  }

  if(this.itemPendiente.length <= 0)
  { 
    this.alertService.alertFail('Debe cargar sabor/codigo',false,900)
    return;
  }
  
  const checkExistsLineaSabor = this.sabores_cargados.find((sabor_cargado: any) => {
    return sabor_cargado.IdSabor == this.itemPendiente.id_sabor;
  });
  

  if(!(checkExistsLineaSabor != undefined))
  {
    this.sabores_cargados.push(
      {
        id_sabor: Number(this.itemPendiente.id_sabor),
        sabor: this.itemPendiente.sabor,
        producto: '',
        codigo: this.codigoLineaSabor,
        precio_venta: this.itemPendiente.precio_venta
      }
    );
  
  
    this.cantidadLineaSabor = 1;
  }
  else{
    this.alertService.alertFail('Sabor ya cargado',false,1200)
    return;

    this.itemCheckExists = checkExistsLineaSabor;
    this.itemIdSabor = this.itemCheckExists.IdProducto;


    for (let item of this.sabores_cargados) {
      if(item.IdProducto == this.itemCheckExists.IdProducto)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaSabor);
      }
     }
  }

  this.codigoLineaSabor = '';
  this.banderaGenerarCodigo = false; 
  this.itemPendiente = [];
  this.saboresReference.clear();
  this.saboresReference.close();
  // this.keywordSabor = '';

}

  // ==============================
  // Para sabores
  // ================================
  selectEventSabor(item: any) {
    
    this.itemPendiente = item;
  }

  onChangeSearch(val: any) {
    this.saborBuscado = val;
    // this.cargarSabores();
  }
  
}
