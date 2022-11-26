import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-direccion-envio',
  templateUrl: './direccion-envio.component.html',
  styles: []
})
export class DireccionEnvioComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  direccionesCliente!: any;
  cantPlanes = 0;
  IdPersona: any;

  totalUsuarios = 0;
  cargando = true;

  constructor(
    public clientesService: ClientesService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarDireccionesCliente();
  }

// ==================================================
// Carga
// ==================================================

cargarDireccionesCliente() {
  console.log("pasa cargarDireccionesCliente");

  this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');

    this.clientesService.dameDirecionesCliente( this.IdPersona  )
               .subscribe( (resp: any) => {

                console.log("resp es : ",resp)

                this.direccionesCliente = resp[0];

                this.cargando = false;

              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalUsuarios ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarUsuarios();

}




}
