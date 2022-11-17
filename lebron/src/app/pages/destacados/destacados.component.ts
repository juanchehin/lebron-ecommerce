import { Component, OnInit } from '@angular/core';
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

  totalUsuarios = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService
  ) {
   }

  ngOnInit() {
    this.cargarProductosDestacadosHome();
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




}
