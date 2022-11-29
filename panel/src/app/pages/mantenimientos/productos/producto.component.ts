import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { UnidadesService } from '../../../services/unidades.service';
import { CategoriasService } from '../../../services/categorias.service';

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

  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public categoriasService: CategoriasService,
    public unidadesService: UnidadesService,
    
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
      Peso: new FormControl(null ),
      Sabor: new FormControl(null ),
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
        this.forma.value.Peso,
        this.forma.value.Sabor,
        this.forma.value.PrecioCompra,
        this.forma.value.PrecioVenta,
        this.forma.value.PrecioMayorista,
        this.forma.value.PrecioMeli,
        this.forma.value.Descuento,
        this.forma.value.Moneda       
      );

      this.productosService.altaProducto( producto )
                .subscribe( (resp: any) => {
                  
                  if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Producto cargado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/dashboard/productos']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Hubo un problema al cargar',
                      text: resp.Mensaje
                    });
                  }
                  return;
                });


            }

// ==================================================
// Carga
// ==================================================

cargarDatosFormNuevoProducto() {
  console.log("pasa cargar cargarDatosFormNuevoProducto");

    this.productosService.cargarDatosFormNuevoProducto(  )
               .subscribe( (resp: any) => {

                console.log("resp es : ",resp)

                this.marcas = resp[0];
                this.categorias = resp[1];
                this.unidades = resp[2];
                this.proveedores = resp[3];
                this.sucursalPrincipal = resp[4][0].Sucursal;

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
}
