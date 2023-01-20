import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styles: []
})
export class EnvioComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  direccionDefectoSeleccionada: any;
  costoEnvio: any;

  usuarios!: any;
  cantPlanes = 0;

  totalUsuarios = 0;
  cargando = true;
  IdPersona: any;

  constructor(
    public usuariosService: UsuariosService,
    public authService: AuthService,
    public clientesService: ClientesService
  ) {
   }

  ngOnInit() {
    this.cargarDatosEnvio();
  }

  // =================================
  // Carga el costo del envio y la direccion del usuario 
  // seleccionada por defecto por el
// =================================

  cargarDatosEnvio(){
    this.IdPersona = this.authService.IdPersona;

    this.clientesService.cardarDatosEnvio(this.IdPersona)
    .subscribe( (resp: any) => {

      console.log("resp es : ",resp)

      this.costoEnvio = resp[1][0].costo_evnio;

      this.direccionDefectoSeleccionada = resp[0];

      this.cargando = false;

    });
  }

  continuarCompra(){

    // Obtener el check seleccionado

    // Redireccionar a la pagina correspondiente
    // if(){
      // 
        // routerLink(perfil/direcciones/:IdPersona)  
    // }
    // else{ 
      // Fin de la compra, enviar al checkout de mercadopago
    //   routerLink() 
    // }
  }



}
