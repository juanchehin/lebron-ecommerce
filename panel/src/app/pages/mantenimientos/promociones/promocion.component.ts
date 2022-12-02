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

  keywordProducto = 'NombreCompleto';
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

  // this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdProducto');
  // this.IdPersona = this.authService.personaId;

      const promocion = new Array(
        this.lineas_promocion,
        this.Promocion,
        this.PrecioPromocion,
        this.Descripcion
      );

      console.log("nueva promo es ",promocion)

      this.productosService.altaPromocion( promocion )
                .subscribe( (resp: any) => {
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
// Carga
// ==================================================

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado )
             .subscribe( (resp: any) => {

              this.productos = resp[0];

            });

}

// ==================================================
// 
// ==================================================
  cambiaCantidadPromocion(cantidad: any) {
    
    this.cantidadLineaPromocion = cantidad.data;
    
  }
  
// ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempeña
// ==================================================

agregarLineaPromocion() {
  
  this.totalPromocion += Number(this.itemPendiente.PrecioMayorista) * this.cantidadLineaPromocion;

  this.lineas_promocion.push(
    {
      IdItem: this.IdItem,
      IdProducto: this.itemPendiente.IdProducto,
      Codigo: this.itemPendiente.Codigo,
      Producto: this.itemPendiente.Producto,
      Cantidad: this.cantidadLineaPromocion,
      PrecioVenta: this.itemPendiente.PrecioMayorista
    }
  );

  this.IdItem += 1;

  this.cantidadLineaPromocion = 1;

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
}
