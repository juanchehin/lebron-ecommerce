import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-configuraciones-empresa',
  templateUrl: './configuraciones-empresa.component.html',
  styles: []
})
export class ConfiguracionesEmpresaComponent implements OnInit {

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
  retencionMP!:string;
  tasaInteres!: any;
  dias_cc: any;

  constructor(
    private router: Router, 
    public configuracionesService: ConfiguracionesService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
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
      Dolar: new FormControl(null ),
      retencionMP: new FormControl(null ),
      tasaInteres: new FormControl(null ),
      dias_cc: new FormControl(null)
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
        this.forma.value.Dolar || this.Dolar,
        this.forma.value.retencionMP || this.retencionMP,
        this.forma.value.tasaInteres || this.tasaInteres,
        this.forma.value.dias_cc || this.dias_cc
      );

      this.configuracionesService.actualizarConfiguracion( configuraciones )
                .subscribe( {
                  next: (resp: any) => { 
  
                    if ( resp[0][0].mensaje === 'Ok') {
                      this.alertService.alertSuccess('top-end','Configuracion guardada',false,2000);
                      // this.router.navigate(['/dashboard/configuraciones']);
                    } else {
                      this.alertService.alertFailWithText('Ocurrio un error',resp[0][0].mensaje,false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
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
              this.retencionMP =  this.configuraciones.retencion_mp;
              this.tasaInteres =  this.configuraciones.tasa_interes_inversores;
              this.dias_cc = this.configuraciones.dias_vencimiento_cc;

            });

}

}
