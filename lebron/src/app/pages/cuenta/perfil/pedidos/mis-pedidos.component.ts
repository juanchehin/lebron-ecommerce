import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styles: []
})
export class MisPedidosComponent implements OnInit {

  formularioRegistroCliente!: FormGroup;
  pedidosCliente: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;
  Cliente: any;
  IdPersona: any;

  constructor(
    public authService: AuthService,
    public clientesService: ClientesService,
    public router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  ngOnInit() {
    this.cargarPedidosCliente();
    this.comprobarLogueo();
  }

// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarPedidosCliente() {

  this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');

  this.clientesService.dameDirecionesCliente(  )
             .subscribe( (resp: any) => {

              console.log("resp es : ",resp)

              this.pedidosCliente = resp[0];

              this.cargando = false;

            });

}

// ***
comprobarLogueo() {
  if(!this.authService.estaLogueado())
  { 
    this.router.navigate(['/']);
  }
}
}
