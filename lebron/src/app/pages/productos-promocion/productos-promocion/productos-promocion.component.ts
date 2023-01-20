import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';

const url_imagenes_producto = environment.ruta_img_productos;

@Component({
  selector: 'app-productos-promocion',
  templateUrl: './productos-promocion.component.html',
  styleUrls: ['./productos-promocion.component.css']
})
export class ProductosPromocionComponent implements OnInit {

  desde = 0;
  numbers: any[] = [];
  public imgTemp: any = '../../../assets/img/lebron_lebron.png';
  url_imagenes_producto = url_imagenes_producto;
  promociones!: any;
  cantPlanes = 0;

  totalPromociones = 0;
  cantidadPaginado = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarPromociones();
  }

// ==================================================
// Carga
// ==================================================

cargarPromociones() {

    this.productosService.listarPromocionesPaginado( this.desde  )
               .subscribe( (resp: any) => {

                this.promociones = resp[0];

                this.totalPromociones = resp[1][0].cantPromociones;

                if(this.totalPromociones > 12)
                {
                  this.cantidadPaginado = Math.ceil(this.totalPromociones/12);
                }
                else
                {
                  this.cantidadPaginado = 1;
                }

                this.numbers = Array.from({length: this.cantidadPaginado}, (_, i) => i + 1)

              });

  }


// ==================================================
// Carga
// ==================================================

rutearDetallePromocion(IdPromocion: any) {

  this.router.navigate(['/promocion',IdPromocion]);

  }



}
