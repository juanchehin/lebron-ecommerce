import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ComprasService } from 'src/app/services/compras.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styles: []
})
export class ListarGastosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  //
  fecha_inicio: any;
  fecha_fin: any;

  gastos!: any;
  controlFechas = false;
  totalGastos = 0;
  cargando = true;
  sucursales_vendedor: any;
  id_sucursal_seleccionada_alta_gasto = 0;
  id_sucursal_seleccionada_listado = 0;
  suma_gastos = 0;
  comprobante_gasto: any;
  FinalformData!: FormData;

  //
  descripcion_nuevo_gasto: any;
  monto_nuevo_gasto: any;
  fecha_nuevo_gasto: any;
  tipo_pago_nuevo_gasto = '13';

  @ViewChild('divCerrarModalAltaGasto') divCerrarModalAltaGasto!: ElementRef<HTMLElement>;

  //
  fechaActual = new Date();

  month = ('0' + (this.fechaActual.getMonth() + 1)).slice(-2);
  day = ('0' + this.fechaActual.getDate()).slice(-2);

  anio_actual = this.fechaActual.getFullYear();
  anio_seleccionado = this.fechaActual.getFullYear();

  fecha_gasto = `${this.anio_actual}-${this.month}-${this.day}`;

  constructor(
    public comprasService: ComprasService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha_nuevo_gasto = `${this.anio_actual}-${this.month}-${this.day}`;

    this.fecha_inicio = this.utilService.formatDateNow(Date.now());
    this.fecha_fin = this.utilService.formatDateNow(Date.now());

    this.cargarGastos();
  }

// ==================================================
// Carga
// ==================================================

cargarGastos() {

  // const pFecha = this.utilService.formatDate(this.fecha);

    this.comprasService.listarGastosPaginado( this.desde, this.fecha_inicio,this.fecha_fin ,this.id_sucursal_seleccionada_listado )
    .subscribe({
      next: (resp: any) => {
        
        this.sucursales_vendedor = resp[3];

        if(resp[4][0].mensaje == 'ok') {
          this.gastos = resp[0];
          this.totalGastos = resp[1][0].totalGastos;
          this.suma_gastos = resp[2][0].suma_gastos;
          
        } else {
          this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2500);
          
        }
       },
      error: () => {  
        this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2500);
       }
    });

  }
// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosFechaInicio(nuevafechaInicio: any) {

  if (nuevafechaInicio > this.fecha_inicio) {
    // this.fechaInicio = nuevafechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosFechaFin(nuevafechaFin: any) {

  if (nuevafechaFin < this.fecha_fin) {
    // this.fechaInicio = nuevafechaFin;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }
  // this.fechaFin = nuevafechaFin;

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalGastos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarGastos();

}

// ==================================================
//    
// ==================================================

search() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarGastos();
}

// ==================================================
//    
// ==================================================

refrescar() {

  this.fecha_inicio = this.utilService.formatDateNow(Date.now());
  this.fecha_fin = this.utilService.formatDateNow(Date.now());

  this.id_sucursal_seleccionada_listado = 0;

  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarGastos();
}
// ==================================================
//    
// ==================================================

alta_gasto() {
  
    if ( this.monto_nuevo_gasto <= 0 ) {
      this.alertService.alertFail('El monto debe ser mayor a cero',false,2000);
      return;
    }

    const checkExistsSucursal = this.sucursales_vendedor.find((id_suc: any) => {
      return id_suc.id_sucursal == this.id_sucursal_seleccionada_alta_gasto;
    });

    if(checkExistsSucursal == undefined || checkExistsSucursal == 'undefined') {
      this.alertService.alertInfoWithText('Atencion','sucursal invalida',false,2000);
      return;
    }

    if ( this.tipo_pago_nuevo_gasto <= '0' ) {
      this.alertService.alertInfoWithText('Atencion','tipo de pago invalido',false,2000);
      return;
    }

    const gasto = new Array(
      this.monto_nuevo_gasto,
      this.tipo_pago_nuevo_gasto,
      this.fecha_gasto,
      this.descripcion_nuevo_gasto,
      this.id_sucursal_seleccionada_alta_gasto
    );

    this.comprasService.altaGasto( gasto , this.comprobante_gasto)
              .subscribe( {
                next: (resp: any) => {
                  
                if ( resp[0][0].mensaje == 'ok') {

                  this.refrescar();
                  this.alertService.alertSuccess('top-end','Gasto cargado',false,2000);
                  let el: HTMLElement = this.divCerrarModalAltaGasto.nativeElement;
                  el.click();
                  
                } else {
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2500);
                }
                return;

            },
            error: () => { 
              this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2500);
            }
          });
  }

 // ==============================
  // 
  // ================================
  onChangeTipo(val: any){
    this.tipo_pago_nuevo_gasto = val;
  }

  onChangeSucursal(val: any){
    this.id_sucursal_seleccionada_alta_gasto = val;
  }

  onChangeSucursalListado(val: any){
    this.id_sucursal_seleccionada_listado = val;
  }

    // ==============================
  // Comprobante PDF
  // ================================

  onFileSelected(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.comprobante_gasto = event.target.files[0];

      this.FinalformData = new FormData();
      this.FinalformData.append('comprobante_gasto', this.comprobante_gasto, this.comprobante_gasto.name);
    }else{
      this.alertService.alertFail('Ocurrio un error al cargar el comprobante ',false,1000);
    }

  }
    // ==============================
  // 
  // ================================
  cerrarModalNuevoGasto(){

    this.descripcion_nuevo_gasto = '';
    this.tipo_pago_nuevo_gasto = 'N';
    this.monto_nuevo_gasto = 0;
    this.fecha_nuevo_gasto = `${this.anio_actual}-${this.month}-${this.day}`;

    let el: HTMLElement = this.divCerrarModalAltaGasto.nativeElement;
    el.click();
  }

}
