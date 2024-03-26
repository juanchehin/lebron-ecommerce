import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { DolaresService } from 'src/app/services/dolares.service';
import { UtilService } from 'src/app/services/util.service';

import { environment } from 'src/environments/environment';
const url_comprobantes_dolar = environment.ruta_comprobante_dolares;

@Component({
  selector: 'app-historico-dolares',
  templateUrl: './historico-dolares.component.html',
  styles: []
})

export class HistoricoDolaresComponent implements OnInit {

  desde = 0;
  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));
  controlFechas = false;
  totalHistorico = 0;
  historicoDolares: any;
  dolarHoy = 0;
  filtroTipo = 0;
  //
  monto_compra_dolar = 0;
  observaciones_compra_dolar: any;
  comprobante_compra_dolar: any;
  fecha_compra_dolar: any;
  array_compra_dolar: any = [];
  //
  monto_venta_dolar = 0;
  observaciones_venta_dolar: any;
  comprobante_venta_dolar: any;
  fecha_venta_dolar: any;
  array_venta_dolar: any = [];
  //
  FinalformData!: FormData;
  url_comprobantes_dolar_local: any;

  @ViewChild('botonCerrarModalCompraDolar') botonCerrarModalCompraDolar!: ElementRef<HTMLElement>;
  @ViewChild('botonCerrarModalVentaDolar') botonCerrarModalVentaDolar!: ElementRef<HTMLElement>;

  constructor(
    public dolaresService: DolaresService,
    private alertService: AlertService,
    private utilService: UtilService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.fecha_venta_dolar = this.utilService.formatDateNow(new Date(Date.now()));
    this.fecha_compra_dolar = this.utilService.formatDateNow(new Date(Date.now()));
    this.url_comprobantes_dolar_local = url_comprobantes_dolar;

    this.listarHistoricoDolares();
  }

// ==================================================
// Carga
// ==================================================

listarHistoricoDolares() {

  const pfechaInicio  = this.utilService.formatDate(this.fechaInicio);
  const pfechaFin = this.utilService.formatDate(this.fechaFin);

  this.dolaresService.listarHistoricoDolares( this.filtroTipo, this.desde , pfechaInicio , pfechaFin)
             .subscribe( {
              next: (resp: any) => { 

                this.totalHistorico = resp[1][0].totalTransacciones;

                this.historicoDolares = resp[0];

                return;
               },
              error: () => { 
                this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
               }
            });
  }

  // ==================================================
//        Crear 
// ==================================================

alta_compra_dolar() {
  

  if ( this.monto_compra_dolar <= 0 ) {
    this.alertService.alertFail('Monto invalido',false,2000);
    return;
  }

  this.array_compra_dolar.push(        
    this.monto_compra_dolar,
    this.fecha_compra_dolar,
    this.observaciones_compra_dolar
    );
    
    console.log('this.comprobante_venta_dolar::: ', this.comprobante_compra_dolar);


  this.dolaresService.alta_compra_dolar(  this.array_compra_dolar, this.comprobante_compra_dolar )
  .subscribe({
    next: (resp: any) => {
      
      if ( resp[0][0].mensaje == 'ok') {
        this.alertService.alertSuccess('top-end','Transaccion confirmada',false,2000);

        this.refrescar();
        let el: HTMLElement = this.botonCerrarModalCompraDolar.nativeElement;
        el.click();

        this.monto_compra_dolar = 0;
        this.observaciones_compra_dolar = "";

      } else {
        this.alertService.alertFailWithText('Ocurrio un error',resp[0][0].mensaje,false,2000);
      }
      return;
     },
    error: () => { 
      this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000)
     }
  });

}


// ==================================================
//        Crear 
// ==================================================

alta_venta_dolar() {
  
  if ( this.monto_venta_dolar <= 0 ) {
    this.alertService.alertFail('Monto invalido',false,2000);
    return;
  }

  this.array_venta_dolar.push(        
    this.monto_venta_dolar,
    this.fecha_venta_dolar,
    this.observaciones_venta_dolar
  );
  
  
  this.dolaresService.alta_venta_dolar(  this.array_venta_dolar, this.comprobante_venta_dolar )
  .subscribe({
    next: (resp: any) => {
      
      if ( resp[0][0].mensaje == 'ok') {
        this.alertService.alertSuccess('top-end','Transaccion confirmada',false,2000);

        this.refrescar();
        let el: HTMLElement = this.botonCerrarModalVentaDolar.nativeElement;
        el.click();

        this.monto_venta_dolar = 0;
        this.observaciones_venta_dolar = "";
        
      } else {
        this.alertService.alertFailWithText('Ocurrio un error',resp[0][0].mensaje,false,2000);
      }
      return;
     },
    error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
  });

}


// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosfechaInicio(nuevafechaInicio: any) {

  if (nuevafechaInicio > this.fechaFin) {
    
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosfechaFin(nuevafechaFin: any) {

  if (nuevafechaFin < this.fechaInicio) {
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

const desde = this.desde + valor;

if ( desde >= this.totalHistorico ) {
  return;
}

if ( desde < 0 ) {
  return;
}

this.desde += valor;
this.listarHistoricoDolares();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

search() {

  if(this.fechaInicio > this.fechaFin)
  {
    this.alertService.alertFail('Error de fechas',false,2000)
    return;
  }
  this.desde = 0;
  this.listarHistoricoDolares();
}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {

  this.fecha_venta_dolar = this.utilService.formatDateNow(new Date(Date.now()));
  this.fecha_compra_dolar = this.utilService.formatDateNow(new Date(Date.now()));
  this.desde = 0;

  this.listarHistoricoDolares();
}
  // ==============================
  // Comprobante PDF
  // ================================

  onFileSelectedCompraDolar(event: any) {
    // console.log('event::: ', event);
    console.log('event.target.files::: ', event.target.files);
    console.log('event.target.files.length::: ', event.target.files.length);

    if (event.target.files && event.target.files.length > 0) {
      this.comprobante_compra_dolar = event.target.files[0];

      this.FinalformData = new FormData();
      this.FinalformData.append('comprobante_compra_dolar', this.comprobante_compra_dolar, this.comprobante_compra_dolar.name);
      console.log('this.FinalformData::: ', this.FinalformData);
    }else{
      this.alertService.alertFail('Ocurrio un error al cargar el comprobante ',false,1000);
    }

  }

    // ==============================
  // Comprobante PDF
  // ================================

  onFileSelectedVentaDolar(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.comprobante_venta_dolar = event.target.files[0];

      this.FinalformData = new FormData();
      this.FinalformData.append('comprobante_venta_dolar', this.comprobante_venta_dolar, this.comprobante_venta_dolar.name);
    }else{
      this.alertService.alertFail('Ocurrio un error al cargar el comprobante ',false,1000);
    }

  }

  // ==============================
  // 
  // ================================
  get_comprobante(nombre_comprobante_transaccion: any){
    console.log('nombre_comprobante_transaccion::: ', nombre_comprobante_transaccion);
    console.log('url_comprobantes_dolar::: ', url_comprobantes_dolar);

    var ruta_comprobante = url_comprobantes_dolar + nombre_comprobante_transaccion;

    console.log('ruta_comprobante::: ', ruta_comprobante);

    this.router.navigateByUrl(ruta_comprobante);
   
  }
  
}
