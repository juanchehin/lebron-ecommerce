import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  forma!: FormGroup;
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

altaPromocion() {

  // this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdProducto');
  // this.IdPersona = this.authService.personaId;

      if ( this.forma.invalid ) {
        return;
      }

      const promocion = new Array(
        this.lineas_promocion
      );

      this.productosService.altaPromocion( promocion )
                .subscribe( (resp: any) => {
                  console.log("resp en plan es : ",resp)
                  if ( resp.Mensaje === 'Ok') {
                    this.alertaService.alertSuccess('top-end','Venta cargada',false,2000);
                    
                    this.router.navigate(['/mantenimiento/planes']);
                  } else {
                    this.alertaService.alertFail('Venta cargada',false,2000);
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
