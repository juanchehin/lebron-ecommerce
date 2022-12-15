import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComprasService } from 'src/app/services/compras.service';
import { AlertService } from 'src/app/services/alert.service';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styles: []
})
export class MisVentasComponent implements OnInit {

  @ViewChild('content') content: ElementRef | undefined;

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  fecha: any;
  compras!: any;
  cantPlanes = 0;
  IdPersona: any;
  controlFechas = false;
  // totalCompras = 0;
  cargando = true;
  totalCompras = 0;



  constructor(
    public proveedoresService: ProveedoresService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public comprasService: ComprasService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.formatDate(previous);
    this.cargarComprasIdUsuario();
  }

// ==================================================
// Carga
// ==================================================

cargarComprasIdUsuario() { 

  const pFecha = this.formatDate(this.fecha);

    this.comprasService.listarComprasIdUsuario(this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        if(resp[1][0].Mensaje == 'Ok') {
          this.compras = resp[0];
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: (err: any) => { 
        this.alertService.alertFail('Ocurrio un error',false,400);
       }
    });

  }


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarComprasIdUsuario();
}

// ==================================================
// Detecta los cambios en el select
// ==================================================
cambiosFecha(nuevaFechaInicio: any) {

  if (nuevaFechaInicio > this.fecha) {
    // this.FechaInicio = nuevaFechaInicio;
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

  if ( desde >= this.totalCompras ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarProductos();

}

// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {

  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),month = '' + (d.getMonth() + 1),day = '' + (d.getDate() + 1),
  // tslint:disable-next-line: prefer-const
  year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }

  return [year, month, day].join('-');
}


}
