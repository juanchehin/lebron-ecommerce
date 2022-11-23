import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  desde = 0;

  cargando = true;
  IdProducto: any;

  Producto: any;
  Marca: any;
  Codigo: any;
  Stock: any;
  Descripcion: any;
  Peso: any;
  Sabor: any;
  PrecioVenta: any;
  Categoria: any;
  SubCategoria: any;
  Unidad: any;

  constructor(
    public usuariosService: UsuariosService,
    public authService: AuthService,
    public productosService: ProductosService,
    public activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarDatosProducto();
  }

  // =================================
  // Carga el costo del envio y la direccion del usuario 
  // seleccionada por defecto por el
// =================================

cargarDatosProducto(){

  this.IdProducto = this.activatedRoute.snapshot.paramMap.get('IdProducto');

    this.productosService.dameDatosProducto(this.IdProducto)
    .subscribe( (resp: any) => {

      this.Producto = resp[0][0].Producto;
      this.Categoria = resp[0][0].Categoria;
      this.SubCategoria = resp[0][0].SubCategoria;
      this.Marca = resp[0][0].Marca;
      this.Codigo = resp[0][0].Codigo;
      this.Stock = resp[0][0].Stock;
      this.Descripcion = resp[0][0].Descripcion;
      this.Peso = resp[0][0].Peso;
      this.Sabor = resp[0][0].Sabor;
      this.Unidad = resp[0][0].NombreCorto;
      this.PrecioVenta = resp[0][0].PrecioVenta;

    });
  }


}
