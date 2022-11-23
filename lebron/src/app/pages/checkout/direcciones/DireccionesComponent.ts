import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styles: []
})
export class DireccionesComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  usuarios!: any;
  cantPlanes = 0;

  totalUsuarios = 0;
  cargando = true;

  constructor(
    public usuariosService: UsuariosService
  ) {
  }

  ngOnInit() {
    // this.cargarDatosEnvio();
  }

  continuarCompra() {
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
