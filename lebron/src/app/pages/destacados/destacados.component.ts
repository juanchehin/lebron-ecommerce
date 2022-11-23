import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styles: []
})
export class DestacadosComponent implements OnInit {

  public imgTemp: any = '../../../assets/img/lebron_lebron.png';

  productosDestacados!: any;

  usuarios!: any;
  totalProductosDestacados = 0;
  IdPersona: any;

  totalUsuarios = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    public clientesService: ClientesService,
    public authService: AuthService
  ) {
   }

  ngOnInit() {
    this.cargarProductosDestacadosHome();
    this.IdPersona = this.authService.IdPersona;
  }

// ==================================================
// Carga
// ==================================================

cargarProductosDestacadosHome() {

  this.productosService.listarProductosDestacadosHome(  )
  .subscribe( (resp: any) => {

   this.productosDestacados = resp[0];

 });

  }

// ==================================================
// Carga
// ==================================================

  agregarItemCarrito(IdProducto: any){

    this.clientesService.altaItemCarrito( IdProducto,this.IdPersona )
      .subscribe( (resp: any) => {

        // this.productosDestacados = resp[0];

    });
  }

}
