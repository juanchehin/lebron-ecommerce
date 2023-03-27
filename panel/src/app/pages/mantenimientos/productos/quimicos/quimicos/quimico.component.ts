import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertService } from 'src/app/services/alert.service';
import { QuimicosService } from 'src/app/services/quimicos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-quimico',
  templateUrl: './quimico.component.html',
  styles: []
})
export class QuimicoComponent implements OnInit {

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
  Quimico: any;
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
    public quimicosService: QuimicosService, 
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public categoriasService: CategoriasService,
    public unidadesService: UnidadesService,
    public alertService: AlertService
    ) {

  }

  ngOnInit() {
    this.cargarDatosFormNuevoQuimico();
  }

// ==================================================
//        Crear 
// ==================================================

altaQuimico() {

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

      const quimico = new Array(
        this.IdUnidad,
        this.Quimico,
        this.FechaVencimiento,
        this.Descripcion,
        this.StockAlerta,
        this.Medida,
        this.PrecioCompra,
        this.PrecioVenta,
        this.PrecioMayorista,
        this.Moneda,
        this.sabores_cargados
      );

      this.quimicosService.altaQuimico( quimico )
                .subscribe( {
                  next: (resp: any) => { 
  
                    console.log("resp prod : ",resp)
                  
                    console.log("resp.mensaje prod : ",resp.mensaje)

                    if ( resp.mensaje == 'Ok') {
                      this.alertService.alertSuccess('top-end','Quimico cargado',false,2000);
                      this.router.navigate(['/dashboard/quimicos']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                    }
                    return;
                   },
                  error: (resp: any) => { 
                    console.log("resp err prod : ",resp)

                    this.alertService.alertFail('Ocurrio un error',false,2000) 
                  }
                });

            }

// ==================================================
// Carga
// ==================================================

cargarDatosFormNuevoQuimico() {

    this.quimicosService.cargarDatosFormNuevoQuimico(  )
               .subscribe( (resp: any) => {

                this.unidades = resp[0];
                this.sabores = resp[1];

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
