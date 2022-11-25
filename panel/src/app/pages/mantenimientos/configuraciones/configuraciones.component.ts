import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styles: []
})
export class ConfiguracionesComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;
  configuraciones: any;

  NombreEmpresa!: string;
  CUIT!: string;
  Email!: number;
  Imagen!: string;
  Telefono!: string;
  Direccion!: string;
  IngBrutos!: string;
  IVA!: string;
  Instagram!: number;
  Twitter!: string;
  Facebook!: any;
  Youtube!: string;
  Tarjeta1Pago!: string;
  Tarjeta3Pago!: string;
  Tarjeta6Pago!: string;
  CostoEnvio!: string;
  Dolar!:string;

  constructor(
    private router: Router, 
    public configuracionesService: ConfiguracionesService, 
    public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarConfiguraciones();

    this.forma = new FormGroup({
      NombreEmpresa: new FormControl(null),
      CUIT: new FormControl(null),
      Email: new FormControl(null ),
      Telefono: new FormControl(null ),
      Direccion: new FormControl(null),
      IngBrutos: new FormControl(null),
      IVA: new FormControl(null ),
      Instagram: new FormControl(null ),
      Twitter: new FormControl(null ),
      Facebook: new FormControl(null ),
      Youtube: new FormControl(null),
      Tarjeta1Pago: new FormControl(null),
      Tarjeta3Pago: new FormControl(null ),
      Tarjeta6Pago: new FormControl(null ),
      CostoEnvio: new FormControl(null ),
      Dolar: new FormControl(null )
      });
  }

// ==================================================
//        Crear 
// ==================================================

actualizarConfiguraciones() {

  console.log("pasa actualizar")

      if ( this.forma.invalid ) {
        return;
      }

      console.log("pasa actualizar 1")
      const configuraciones = new Array(
        this.forma.value.NombreEmpresa || this.NombreEmpresa,
        this.forma.value.CUIT || this.CUIT,
        this.forma.value.Email || this.Email,
        this.forma.value.Imagen || this.Imagen,
        this.forma.value.Telefono || this.Telefono,
        this.forma.value.Direccion || this.Direccion,
        this.forma.value.IngBrutos  || this.IngBrutos,
        this.forma.value.IVA || this.IVA,
        this.forma.value.Instagram || this.Instagram,
        this.forma.value.Twitter || this.Twitter,
        this.forma.value.Facebook || this.Facebook,
        this.forma.value.Youtube || this.Youtube,
        this.forma.value.Tarjeta1Pago || this.Tarjeta1Pago,
        this.forma.value.Tarjeta3Pago || this.Tarjeta3Pago,
        this.forma.value.Tarjeta6Pago || this.Tarjeta6Pago,
        this.forma.value.CostoEnvio || this.CostoEnvio,
        this.forma.value.Dolar || this.Dolar
      );


      console.log("pasa actualizar configuraciones ",configuraciones)

      this.configuracionesService.actualizarConfiguracion( configuraciones )
                .subscribe( (resp: any) => {
                  console.log("resp en actualizarConfiguracion es : ",resp[0][0] )
                  if ( resp[0][0].Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Configuracion actualizada',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/dashboard/configuraciones']);
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
//  Carga configuraciones con sus datos para mostrar en el formulario
// ==================================================

cargarConfiguraciones() {

  this.configuracionesService.cargarConfiguraciones(  )
             .subscribe( (resp: any) => {

              this.configuraciones = resp[0][0];

              this.NombreEmpresa = this.configuraciones.nombre;
              this.CUIT =  this.configuraciones.CUIT;
              this.Email =  this.configuraciones.email;
              this.Telefono =  this.configuraciones.telefono;
              this.Direccion = this.configuraciones.direccion;
              this.IngBrutos = this.configuraciones.ing_brutos;
              this.IVA =  this.configuraciones.iva;
              this.Instagram =  this.configuraciones.instagram;
              this.Twitter = this.configuraciones.twitter;
              this.Facebook =  this.configuraciones.facebook;
              this.Youtube = this.configuraciones.lebronsuplementos;
              this.Tarjeta1Pago = this.configuraciones.tarjeta1pagos;
              this.Tarjeta3Pago = this.configuraciones.tarjeta3pagos;
              this.Tarjeta6Pago = this.configuraciones.tarjeta6pagos;
              this.CostoEnvio =  this.configuraciones.costo_envio;
              this.Dolar =  this.configuraciones.dolar;

              this.cargando = false;

            });

}
}
