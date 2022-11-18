import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  marcas!: any;
  subcategorias!: any;
  categorias!: any;
  usuarioActual: any;

  constructor(
    private marcasService: MarcasService,
    private categoriasService: CategoriasService,
    public router: Router,
    public clienteService: ClientesService,
    public authService: AuthService
  ) {

  }

  ngOnInit() {
        this.cargarMarcas();
        this.cargarCategoriasSubcategorias();
        this.comprobarLogueo();
        this.usuarioActual = this.clienteService.usuario;
  }

// ==================================================
// Carga
// ==================================================

cargarMarcas() {

    this.marcasService.dameMarcas( )
               .subscribe( (resp: any) => {

                this.marcas = resp[0];

              });

  }

// ==================================================
// Carga
// ==================================================

cargarCategoriasSubcategorias() {

    this.categoriasService.listarCategoriasSubcategorias( )
               .subscribe( (resp: any) => {

                this.categorias = resp[0];
                this.subcategorias = resp[1];

              });

  }

// ==================================================
//
// ==================================================

buscarProducto() {


  const inputElement: HTMLInputElement = document.getElementById('buscarProducto') as HTMLInputElement;
  const productoBuscado: any = inputElement.value || null;

  this.router.navigateByUrl('/busqueda', { skipLocationChange: true }).then(() => {
    this.router.navigate(['busqueda' , productoBuscado]);
});

}

// ==================================================
//        Funcion para comprobar si esta logueado actualmente
// ==================================================
  comprobarLogueo() {
    this.usuarioActual = localStorage.getItem('usuario');

    if (this.authService.estaLogueado()) {
      return true;
    } else {
      return false;
    }
  }
}
