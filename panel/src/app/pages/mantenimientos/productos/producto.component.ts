import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UnidadesService } from '../../../services/unidades.service';
import { CategoriasService } from '../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

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

  // sabores
  sabores: any;
  keywordSabor = 'Sabor';
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
    this.cargarDatosFormNuevoProducto();

    // this.forma = new FormGroup({
    //   IdCategoria: new FormControl(null ),
    //   IdSubCategoria: new FormControl(null ),
    //   IdMarca: new FormControl(null),
    //   IdUnidad: new FormControl(null ),
    //   IdProveedor: new FormControl(null),
    //   Producto: new FormControl(null, Validators.required),
    //   FechaVencimiento: new FormControl(null ),
    //   Descripcion: new FormControl(null ),
    //   StockAlerta: new FormControl(null ),
    //   Medida: new FormControl(null ),
    //   PrecioCompra: new FormControl(null ),
    //   PrecioVenta: new FormControl(null , Validators.required),
    //   PrecioMayorista: new FormControl(null ),
    //   PrecioMeli: new FormControl(null ),
    //   Descuento: new FormControl(null ),
    //   Moneda: new FormControl(null )
    //   });
  }

// ==================================================
//        Crear 
// ==================================================

altaProducto() {

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
      if(this.PrecioCompra > this.PrecioMeli)
      {
        this.alertaPrecioVentaMeli = true;
        return;
      }else
      { 
        this.alertaPrecioVentaMeli = false;
      }
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
      //** */
      // if((this.forma.value.Codigo == '') || (this.forma.value.Codigo == null) ){
      //   this.alertaCodigoVacio = true;
      //   return;
      // }
      // else
      // { 
      //   this.alertaCodigoVacio = false;
      // }

      const producto = new Array(
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
        this.sabores_cargados
      );

      console.log("producto es : ",producto)

      this.productosService.altaProducto( producto )
                .subscribe( {
                  next: (resp: any) => { 
  
                    console.log("resp prod : ",resp)
                  
                    if ( resp.Mensaje === 'Ok') {
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

cargarDatosFormNuevoProducto() {

    this.productosService.cargarDatosFormNuevoProducto(  )
               .subscribe( (resp: any) => {

                console.log("resp es : ",resp)

                this.marcas = resp[0];
                this.categorias = resp[1];
                this.unidades = resp[2];
                this.proveedores = resp[3];
                this.sucursalPrincipal = resp[4][0].Sucursal;
                this.sabores = resp[5];

                this.cargando = false;

              });

  }

  
// ==================================================
// Carga la subcategorias segun la categoria seleccionada
// ==================================================

cargarSubcategoriaIdCategoria(IdCategoria: any) {

    this.categoriasService.cargarSubcategoriaIdCategoria( IdCategoria )
               .subscribe( (resp: any) => {

                this.subcategorias = resp[0];

                this.cargando = false;

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
  eliminarItemSabor(IdProducto: any){

    this.sabores_cargados.forEach( (item: any, index: any) => {
      if(item.IdProducto === IdProducto) 
      {
        // this.totalVenta -= item.PrecioVenta * item.Cantidad;
        this.sabores_cargados.splice(index,1);
      }
        
    });

  }


// ==================================================
// Insera los sabores en el array
// ==================================================

agregarLineaSabor() {

  console.log("this.itemPendiente : ",this.itemPendiente)

  if(this.itemPendiente.Sabor == '')
  { 
    this.alertService.alertFail('Debe elegir un sabor',false,900)
    return;
  }

  console.log("this.codigoLineaSabor : ",this.codigoLineaSabor)

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
    return sabor_cargado.IdSabor == this.itemPendiente.IdSabor;
  });


  if(!(checkExistsLineaSabor != undefined))
  {
    this.sabores_cargados.push(
      {
        IdSabor: Number(this.itemPendiente.IdSabor),
        Sabor: this.itemPendiente.Sabor,
        Producto: this.itemPendiente.Producto,
        Codigo: this.codigoLineaSabor,
        PrecioVenta: this.itemPendiente.PrecioVenta,
      }
    );
  
  
    this.cantidadLineaSabor = 1;
  }
  else{
    this.alertService.alertFail('Sabor ya cargado',false,900)
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
