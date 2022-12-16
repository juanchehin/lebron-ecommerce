import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  forma!: FormGroup;
  cargando = true;
  marcas: any;
  categorias: any;
  codigo: any;
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

  // sabores
  sabores: any;
  keywordSabor = 'Sabor';
  sabores_cargados: any = [];
  itemPendiente: any = [];
  cantidadLineaSabor = 1;
  codigoLineaSabor = '';
  itemIdSabor: any;
  saborBuscado = '';
  itemCheckExists: any = 0;
  

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

    this.forma = new FormGroup({
      IdCategoria: new FormControl(null ),
      IdSubCategoria: new FormControl(null ),
      IdMarca: new FormControl(null),
      IdUnidad: new FormControl(null ),
      Producto: new FormControl(null, Validators.required),
      Codigo: new FormControl(null , Validators.required),
      Stock: new FormControl(null , Validators.required),
      FechaVencimiento: new FormControl(null ),
      Descripcion: new FormControl(null ),
      StockAlerta: new FormControl(null ),
      Medida: new FormControl(null ),
      IdSabor: new FormControl(null ),
      PrecioCompra: new FormControl(null ),
      PrecioVenta: new FormControl(null , Validators.required),
      PrecioMayorista: new FormControl(null ),
      PrecioMeli: new FormControl(null ),
      Descuento: new FormControl(null ),
      Moneda: new FormControl(null )
      });
  }

// ==================================================
//        Crear 
// ==================================================

altaProducto() {

  return;
      if ( this.forma.invalid ) {
        return;
      }
      //** */
      if((this.forma.value.PrecioCompra > this.forma.value.PrecioVenta) ){
        this.alertaPrecioVentaCompra = true;
        return;
      }
      else
      { 
        this.alertaPrecioVentaCompra = false;
      }
      //** */
      if(this.forma.value.PrecioCompra > this.forma.value.PrecioMeli)
      {
        this.alertaPrecioVentaMeli = true;
        return;
      }else
      { 
        this.alertaPrecioVentaMeli = false;
      }
      //** */
      if(this.forma.value.PrecioCompra > this.forma.value.PrecioMayorista)
      {
        this.alertaPrecioVentaMayorista = true;
        return;
      }else
      { 
        this.alertaPrecioVentaMayorista = false;
      }
      //** */
      if((this.forma.value.Codigo == '') || (this.forma.value.Codigo == null) ){
        this.alertaCodigoVacio = true;
        return;
      }
      else
      { 
        this.alertaCodigoVacio = false;
      }

      const producto = new Array(
        this.forma.value.IdCategoria,
        this.forma.value.IdMarca,
        this.forma.value.IdSubCategoria,
        this.forma.value.IdUnidad,        
        this.forma.value.Producto,
        this.forma.value.Codigo,
        this.forma.value.Stock,
        this.forma.value.FechaVencimiento,
        this.forma.value.Descripcion,
        this.forma.value.StockAlerta,
        this.forma.value.Medida, // 10

        this.forma.value.PrecioCompra,
        this.forma.value.PrecioVenta,
        this.forma.value.PrecioMayorista,
        this.forma.value.PrecioMeli,
        this.forma.value.Descuento,
        this.forma.value.Moneda,  
        this.forma.value.IdSabor
      );

      console.log("producto es : ",producto)

      this.productosService.altaProducto( producto )
                .subscribe( (resp: any) => {

                  console.log("resp prod : ",resp)
                  
                  if ( resp.Mensaje === 'Ok') {
                    this.alertService.alertSuccess('top-end','Producto cargado',false,2000);
                    this.router.navigate(['/dashboard/productos']);
                  } else {
                    this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                  }
                  return;
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
    this.codigo = new Date().valueOf();
  }
  else
  { 
    this.codigo = ''
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
// Carga
// ==================================================

agregarLineaSabor() {
  
  const checkExistsLineaSabor = this.sabores_cargados.find((sabor_cargado: any) => {
    return sabor_cargado.IdSabor == this.itemPendiente.IdProducto;
  });

  if(!(checkExistsLineaSabor != undefined))
  {
    this.sabores_cargados.push(
      {
        IdSabor: Number(this.itemPendiente.IdSabor),
        Sabor: this.itemPendiente.Sabor,
        Producto: this.itemPendiente.Producto,
        Cantidad: this.cantidadLineaSabor,
        PrecioVenta: this.itemPendiente.PrecioVenta,
      }
    );
  
  
    this.cantidadLineaSabor = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaSabor;
    this.itemIdSabor = this.itemCheckExists.IdProducto;


    for (let item of this.sabores_cargados) {
      if(item.IdProducto == this.itemCheckExists.IdProducto)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaSabor);
      }
     }
  }
 

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
