import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UnidadesService } from '../../../services/unidades.service';
import { CategoriasService } from '../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';
import { IItemStructure } from 'src/app/interfaces/item.interface';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styles: []
})
export class PromocionComponent implements OnInit {

  keywordProducto = 'codigoProductoSabor';
  cargando = true;
  productos: any;
  clienteBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  lineas_promocion: IItemStructure[] = [];
  itemPendiente: any = [];
  clientes = [];
  currentDate = new Date();
  datosVendedor: any;
  totalPromocion: number = 0;
  cantidadLineaPromocion = 1;
  IdItem = 0;
  alertaCodigoVacio = false;
  precio = 0;  
  alertaPrecioVacio = false;
  PrecioPromocion: any;
  Descripcion: any;
  Promocion: any;
  banderaGenerarPrecio = false;
  itemCheckExists: any = 0;
  itemIdProducto: any;



  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public categoriasService: CategoriasService,
    public unidadesService: UnidadesService,
    public alertaService: AlertService
    ) {

  }

  ngOnInit() {

  }
// ==================================================
//        Crear 
// ==================================================

altaPromocion() {
  
  if(this.IdItem < 2)
  {
    this.alertaService.alertInfoWithText('Advertencia','Debe agregar dos productos a la promocion',false,1200);
    return;
  }

  if(this.Promocion == '' || this.Promocion == null || this.Promocion == 'null')
  {
    this.alertaService.alertInfoWithText('Advertencia','Debe proporcionar un nombre a la promocion',false,1200);
    return;
  }
  

      const promocion = new Array(
        this.lineas_promocion[0].IdProducto,
        this.lineas_promocion[1].IdProducto,
        this.Promocion,
        this.Descripcion
      );

      console.log("promo es : ",promocion);

      this.productosService.altaPromocion( promocion )
                .subscribe( (resp: any) => {
                  console.log("resp es : ",resp)
                  if ( resp[0][0].Mensaje === 'Ok') {

                    this.alertaService.alertSuccess('top-end','Promocion cargada',false,2000);
                    
                    this.router.navigate(['/dashboard/promociones']);
                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                });


}


// ==================================================
// 
// ==================================================
  cambiaPromocion(event: any) {
    
    this.Promocion = event.target.value;;
    
  }
  // ==================================================
// 
// ==================================================
cambiaDescripcion(event: any) {
    
  this.Descripcion = event.target.value;;
  
}
// ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempe??a
// ==================================================

agregarLineaPromocion() {

  if(this.IdItem > 2)
  {
    this.alertaService.alertInfoWithText('Advertencia','Alcanzo el maximo de productos agregados a la promo',false,900);
    return;
  }

  if((this.itemPendiente.Stock <= 0) || (this.itemPendiente.Stock < this.cantidadLineaPromocion))
  { 
    this.alertaService.alertInfoWithText('Advertencia','Stock insuficiente para ' + this.itemPendiente.Producto,false,2000);
    return;
  }

  this.totalPromocion += Number(this.itemPendiente.PrecioMayorista) * this.cantidadLineaPromocion;

  const checkExistsLineaPromocion = this.lineas_promocion.find((lineas_promocion) => {
    return lineas_promocion.IdProducto == this.itemPendiente.IdProducto;
  });

  if(!(checkExistsLineaPromocion != undefined))
  {
    this.lineas_promocion.push(
      {
        IdItem: this.IdItem,
        IdProducto: Number(this.itemPendiente.IdProducto),
        Codigo: this.itemPendiente.Codigo,
        Producto: this.itemPendiente.Producto,
        Cantidad: this.cantidadLineaPromocion,
        PrecioVenta: this.itemPendiente.PrecioMayorista,
      }
    );
  
    this.IdItem += 1;
  
    this.cantidadLineaPromocion = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaPromocion;
    this.itemIdProducto = this.itemCheckExists.IdProducto;

    for (let item of this.lineas_promocion) {
      if(item.IdProducto == this.itemCheckExists.IdProducto)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaPromocion);
      }
     }
  }

}

  // ==============================
  // Para productos
  // ================================
  selectEventProducto(item: any) {

    this.itemPendiente = item;
  }

  onChangeSearchProducto(val: any) {

    if(val == '')
    {
      return;
    }

    this.productoBuscado = val;
    this.cargarProductos();
  }
  
  onFocusedProducto(e: any){
  }

// ==================================================
// Autocompletar de productos
// ==================================================

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado, 1 )
             .subscribe( (resp: any) => {

              this.productos = resp[0];

            });

}
}
