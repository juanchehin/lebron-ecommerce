import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { DireccionesService } from 'src/app/services/direcciones.service';

@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.component.html',
  styleUrls: ['./nueva-direccion.component.css']
})
export class NuevaDireccionComponent implements OnInit {

  datosDirecionesCliente: any;
  datosProvinciaLocalidades: any;
  cargando = true;
  cp: any;
  aparecer = false;
  parametro: any;
  Cliente: any;
  IdPersona: any;
  forma!: FormGroup;
  Provincia: any;
  IdProvincia!: string;
  habilitarLocalidad = true;
  cpInvalido = false;
  banderaCompletarCamposRequeridos = false;
  telefonoInvalido = false;
  numeroInvalido = false;

  constructor(
    public authService: AuthService,
    public clientesService: ClientesService,
    public direccionesService: DireccionesService,
    public router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');

    this.forma = new FormGroup({
      CP: new FormControl(null),
      Provincia: new FormControl(null),
      IdLocalidad: new FormControl(null, Validators.required ),
      Calle: new FormControl(null, Validators.required),
      Numero: new FormControl(null , Validators.required),
      Piso: new FormControl(null),
      Departamento: new FormControl(null),
      Referencia: new FormControl(null ),
      Telefono: new FormControl(null )
    });
  }

// ==================================================
//  Carga el cliente con sus datos para mostrar en el formulario
// ==================================================

altaDireccion() {

  if ( this.forma.invalid ) {
    this.banderaCompletarCamposRequeridos = true;
    return;
  }

  if(this.forma.value.Telefono)
  {
    if ( !this.isNumber(this.forma.value.Telefono) ) {
      this.telefonoInvalido = true;
      return;
    }
  }

  this.telefonoInvalido = false;
 

  if(this.forma.value.Numero)
  {
    if ( !this.isNumber(this.forma.value.Numero) ) {
      this.numeroInvalido = true;
      return;
    }
  }

  this.numeroInvalido = false;

  const direccion = new Array(
    this.forma.value.IdLocalidad,
    this.forma.value.Calle,
    this.forma.value.Numero,
    this.forma.value.Piso,
    this.forma.value.Departamento,
    this.forma.value.Referencia,
    this.forma.value.Telefono
  );

  this.clientesService.nuevaDireccion( direccion )
             .subscribe( (resp: any) => {
              if ( resp.Mensaje === 'Ok') {
                this.router.navigate(['perfil/direcciones/', this.IdPersona]);
              } else {
                this.router.navigate(['failure']);
              }

            });

}

// ***
buscarProvinciaLocalidades() {

 this.direccionesService.buscarProvinciaLocalidades( this.cp )
             .subscribe( (resp: any) => {

              if(resp[0].length > 0)
              {
                this.datosProvinciaLocalidades = resp[0];
                this.Provincia = resp[0][0].Provincia;
                this.IdProvincia = resp[0][0].IdProvincia;
                this.habilitarLocalidad = false;
                this.cpInvalido = false;
              }
              else
              { 
                this.habilitarLocalidad = true;
                this.cpInvalido = true;
                this.Provincia = '';
              }
              

              this.cargando = false;

            });
}


// ===============================
inputHandle(event: any) {
  
  this.cp = event.target.value;
  
  if (event.target.value.length > 3) {
    this.buscarProvinciaLocalidades();
    // this.habilitarLocalidad = false;
  }
  else
  {
    this.habilitarLocalidad = true;
    // this.cpInvalido = true;
    this.Provincia = '';
  }
}

// =======================
isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}
}