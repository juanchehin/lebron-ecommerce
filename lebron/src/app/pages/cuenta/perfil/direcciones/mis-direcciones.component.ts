import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-mis-direcciones',
  templateUrl: './mis-direcciones.component.html',
  styles: []
})
export class MisDireccionesComponent implements OnInit {

  formularioRegistroCliente!: FormGroup;
  datosDirecionesCliente: any;
  cargando = true;
  cantPlanes = 0;
  aparecer = false;
  parametro: any;
  Cliente: any;
  IdPersona: any;

  constructor(
    public authService: AuthService,
    public clientesService: ClientesService,
    public router: Router
    ) { }
  ngOnInit() {  
    this.cargarIdPersona();
    this.cargarDireccionesCliente();
  }

   // ***
   cargarIdPersona() {
    this.authService.quoteIdPersona.subscribe((dataIdPersona : any) => { 
      this.IdPersona = dataIdPersona;
    });

  }

// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

cargarDireccionesCliente() {

  this.clientesService.dameDirecionesCliente( this.IdPersona )
             .subscribe( (resp: any) => {

              this.datosDirecionesCliente = resp[0];

              this.cargando = false;

            });

}

}
