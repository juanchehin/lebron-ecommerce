import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: []
})
export class NuevaVentaComponent implements OnInit {

  forma!: FormGroup;
  keyword = 'Apellidos';
  cargando = true;
  marcas: any;
  categorias: any;
  codigo: any;
  banderaGenerarCodigo = false;
  clienteBuscado = '';
  IdPersona = '';
  local = '';
  lineas_venta = new Array();
  clientes = [];


  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public ventasService: VentasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public clientesService: ClientesService,
    public marcasService: MarcasService
    
    ) {
    activatedRoute.params.subscribe( (params: any) => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
      }

    });

  }

  ngOnInit() {
    this.cargarClientes();
    this.cargarDatosVendedor();
    
    // this.cargarMarcas();
    // this.cargarUnidades();
    

    this.forma = new FormGroup({
      IdCategoria: new FormControl(null, Validators.required ),
      IdMarca: new FormControl(null, Validators.required),
      IdSubCategoria: new FormControl(null, Validators.required ),
      IdUnidad: new FormControl(null, Validators.required ),
      Producto: new FormControl(null, Validators.required),
      Codigo: new FormControl(null, Validators.required ),
      Stock: new FormControl(null, Validators.required ),
      FechaVencimiento: new FormControl(null, Validators.required ),
      Imagen: new FormControl(null, Validators.required ),
      Descripcion: new FormControl(null, Validators.required ),
      StockAlerta: new FormControl(null, Validators.required ),
      Peso: new FormControl(null, Validators.required ),
      Sabor: new FormControl(null, Validators.required ),
      PrecioCompra: new FormControl(null, Validators.required ),
      PrecioVenta: new FormControl(null, Validators.required ),
      PrecioMayorista: new FormControl(null, Validators.required ),
      PrecioMeli: new FormControl(null, Validators.required ),
      Descuento: new FormControl(null, Validators.required )
      });
  }
  
// ==================================================
//        Crear 
// ==================================================

altaVenta() {

  // this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdProducto');
  this.IdPersona = this.authService.personaId;

      if ( this.forma.invalid ) {
        return;
      }

      const venta = new Array(
        this.forma.value.IdCliente,
        this.forma.value.IdPerona,  // Id del vendedor
        this.forma.value.IdCliente,
        this.lineas_venta
      );

      this.ventasService.altaVenta( venta )
                .subscribe( (resp: any) => {
                  console.log("resp en plan es : ",resp)
                  if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Plan cargado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/mantenimiento/planes']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Hubo un problema al cargar',
                      text: 'Contactese con el administrador',
                    });
                  }
                  return;
                });


}

// ==================================================
// Carga
// ==================================================

cargarClientes() {

    this.clientesService.cargarClientes( this.clienteBuscado )
               .subscribe( (resp: any) => {

                this.clientes = resp;

              });

  }

  // ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempeña
// ==================================================

cargarDatosVendedor() {
  
    // this.usuariosService.cargarDatosVendedor(  this.IdPersona )
    //            .subscribe( (resp: any) => {

    //             console.log("resp es : ",resp)

    //             this.marcas = resp[0];

    //             this.cargando = false;

    //           });

  }

  selectEvent(item: any) {
    console.log("pasa on selectEvent",item)
    // do something with selected item
  }

  onChangeSearch(val: any) {

    this.clienteBuscado = val;
    this.cargarClientes();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // console.log("pasa on onFocused",e)
    // do something when input is focused
  }
}
