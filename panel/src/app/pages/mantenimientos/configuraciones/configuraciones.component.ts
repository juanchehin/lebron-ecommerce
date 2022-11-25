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
      NombreEmpresa: new FormControl(null, Validators.required),
      CUIT: new FormControl(null, Validators.required),
      Email: new FormControl(null, Validators.required ),
      Telefono: new FormControl(null, Validators.required ),
      Direccion: new FormControl(null, Validators.required),
      IngBrutos: new FormControl(null, Validators.required),
      IVA: new FormControl(null, Validators.required ),
      Instagram: new FormControl(null, Validators.required ),
      Twitter: new FormControl(null, Validators.required ),
      Facebook: new FormControl(null, Validators.required ),
      Youtube: new FormControl(null, Validators.required),
      Tarjeta1Pago: new FormControl(null, Validators.required),
      Tarjeta3Pago: new FormControl(null, Validators.required ),
      Tarjeta6Pago: new FormControl(null, Validators.required ),
      CostoEnvio: new FormControl(null, Validators.required ),
      Dolar: new FormControl(null, Validators.required )
      });
  }

// ==================================================
//        Crear 
// ==================================================

actualizarConfiguraciones() {

      if ( this.forma.invalid ) {
        return;
      }

      const configuraciones = new Array(
        this.forma.value.NombreEmpresa,
        this.forma.value.CUIT,
        this.forma.value.Email,
        this.forma.value.Telefono,
        this.forma.value.Direccion,
        this.forma.value.IngBrutos,
        this.forma.value.IVA,
        this.forma.value.Instagram,
        this.forma.value.Twitter,
        this.forma.value.Facebook,
        this.forma.value.Youtube,
        this.forma.value.Tarjeta1Pago,
        this.forma.value.Tarjeta3Pago,
        this.forma.value.Tarjeta6Pago,
        this.forma.value.CostoEnvio
      );

      this.configuracionesService.actualizarConfiguracion( configuraciones )
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

              console.log("resp es : ",resp)
              this.configuraciones = resp[0][0];
              console.log("configuraciones es : ",this.configuraciones)

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
