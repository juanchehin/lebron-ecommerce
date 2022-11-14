import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  IdCategoria: any;
  desde = '0';
  categoriaSeleccionada = '';

  numbers: any[] = [];

  productosCategoria!: any;
  cantPlanes = 0;

  totalProductosCategoria = 0;
  cantidadPaginado = 0;
  cargando = true;

  constructor(
    public productosService: ProductosService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarProductosCategoria();
  }

// ==================================================
// Carga
// ==================================================

cargarProductosCategoria() {
  console.log("pasa cargar cargarProductosCategoria");

  this.IdCategoria = this.activatedRoute.snapshot.paramMap.get('IdCategoria');

    this.productosService.listarProductosCategoria( this.IdCategoria,this.desde  )
               .subscribe( (resp: any) => {

                console.log("resp cargarProductosCategoria es : ",resp)

                this.productosCategoria = resp[0];

                this.categoriaSeleccionada = resp[1][0].Categoria;

                this.totalProductosCategoria = resp[1][0].cantProductosCategoria;

                if(this.totalProductosCategoria > 12)
                {
                  this.cantidadPaginado = Math.ceil(this.totalProductosCategoria/12);
                }
                else
                {
                  this.cantidadPaginado = 1;
                }

                console.log("cantidadPaginado: " + this.cantidadPaginado)

                this.numbers = Array.from({length: this.cantidadPaginado}, (_, i) => i + 1)


                // this.cargando = false;

              });

  }


// ==================================================
//  Busca un cliente por plan o por todos
// ==================================================

  buscarCliente( ) {

    const inputElement: HTMLInputElement = document.getElementById('buscarApellidos') as HTMLInputElement;
    const Apellidos: any = inputElement.value || null;

    const inputElement1: HTMLInputElement = document.getElementById('buscarNombres') as HTMLInputElement;
    const Nombres: any = inputElement1.value || null;

    // this.personaService.buscarClientePorPlan( Apellidos, Nombres , this.planSeleccionado.toString()  )
    //         .subscribe( (resp: any) => {

    //           if( resp.length !== 0 ) {
    //             this.clientes = resp[0];
    //             this.totalClientes = resp[1][0].cantCli;
    //           } else {
    //             this.totalClientes = 0;
    //             this.clientes = resp[0];
    //           }
    //         });

  }

cambiarDesde( valor: number ) {

  // const desde = this.desde + valor;

  // if ( desde >= this.totalUsuarios ) {
  //   return;
  // }

  // if ( desde < 0 ) {
  //   return;
  // }

  // this.desde += valor;
  // this.cargarUsuarios();

}




}