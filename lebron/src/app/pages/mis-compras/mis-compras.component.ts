import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

const ruta_img = environment.ruta_img;

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  desde = 0;
  direccionesCliente: any;
  banderaComprasVacio = false;
  itemsCompras!: any;
  totalItemsCarrito = 0;
  IdPersona: any;
  totalCompras = 0;
  cargando = false;
  ruta_img_empty_cart = ruta_img + 'sin-compras.png';
  datosCompra: any[] = [];
  costoEnvioMP = 0;
  envioSeleccionado: any = -1;
  banderaSeleccionarEnvio: boolean = false;

  constructor(
    public usuariosService: UsuariosService,
    private clientesService: ClientesService
  ) {
   }

  ngOnInit() {
    this.cargarCompras();
  }

// ==================================================
// Carga
// ==================================================

cargarCompras() {
  
    this.clientesService.listarComprasCliente(   )
               .subscribe( (resp: any) => {

                this.totalItemsCarrito = resp[1][0].cantProductosCarrito;

                this.itemsCompras = resp[0];

                if(this.itemsCompras.length <= 0 || this.totalItemsCarrito <= 0)
                {
                  this.banderaComprasVacio = true;
                  return;
                }
                this.banderaComprasVacio = false;        

              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalCompras ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarUsuarios();

}

}
