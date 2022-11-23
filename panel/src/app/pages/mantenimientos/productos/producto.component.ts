import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';
// import { CategoriasService } from 'src/app/services/categorias.service';
import { UnidadesService } from '../../../services/unidades.service';

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



  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    // public categoriasService: CategoriasService,
    public unidadesService: UnidadesService,
    
    ) {
    activatedRoute.params.subscribe( (params: any) => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
      }

    });

  }

  ngOnInit() {
    // this.cargarCategorias();
    // this.cargarMarcas();
    // this.cargarUnidades();

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
      Descuento: new FormControl(null, Validators.required )
      });
  }

// ==================================================
//        Crear 
// ==================================================

altaProducto() {

      if ( this.forma.invalid ) {
        return;
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
        this.forma.value.Imagen,
        this.forma.value.Descripcion,
        this.forma.value.StockAlerta,
        this.forma.value.Peso,
        this.forma.value.Sabor,
        this.forma.value.PrecioCompra,
        this.forma.value.PrecioVenta,
        this.forma.value.PrecioMayorista,
        this.forma.value.PrecioMeli,
        this.forma.value.Descuento       
        
      );

      this.productosService.altaProducto( producto )
                .subscribe( (resp: any) => {
                  console.log("resp en plan es : ",resp)
                  if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Plan cargado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/mantenimiento/planes']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Hubo un problema al cargar',
                      text: 'Contactese con el administrador',
                    });
                  }
                  return;
                });


            }

// ==================================================
// Carga
// ==================================================

cargarCategorias() {
  console.log("pasa cargar productos");

    // this.categoriasService.listarCategorias(  )
    //            .subscribe( (resp: any) => {

    //             console.log("resp es : ",resp)

    //             this.categorias = resp[0];

    //             this.cargando = false;

    //           });

  }

  // ==================================================
// Carga
// ==================================================

cargarMarcas() {
  console.log("pasa cargar productos");

    // this.marcasService.listarMarcas(   )
    //            .subscribe( (resp: any) => {

    //             console.log("resp es : ",resp)

    //             this.marcas = resp[0];

    //             this.cargando = false;

    //           });

  }

// ==================================================
// Carga
// ==================================================

cargarUnidades() {
  // console.log("pasa cargar productos");

  //   this.unidadesService.listarUnidades(  )
  //              .subscribe( (resp: any) => {

  //               console.log("resp es : ",resp)

  //               this.unidades = resp[0];

  //               this.cargando = false;

  //             });

  }

}
