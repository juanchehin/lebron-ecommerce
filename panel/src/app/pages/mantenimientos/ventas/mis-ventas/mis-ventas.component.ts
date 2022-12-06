import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-mis-ventas',
  templateUrl: './mis-ventas.component.html',
  styles: []
})
export class MisVentasComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  fecha: any;
  ventas!: any;
  cantPlanes = 0;
  IdPersona: any;
  controlFechas = false;
  totalProveedores = 0;
  cargando = true;
  totalVentas = '-';

  constructor(
    public proveedoresService: ProveedoresService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public ventasService: VentasService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.formatDate(previous);
    this.cargarVentasIdUsuario();

    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');


    if(this.IdPersona || (this.IdPersona.length == 0))
    { 
      this.authService.quoteIdPersona.subscribe((data : any)=>{
        this.IdPersona = data;

        if(Object.keys(this.IdPersona).length <= 0)
        { 
          this.IdPersona = localStorage.getItem('id');
        }
      });
    }
  }

// ==================================================
// Carga
// ==================================================

cargarVentasIdUsuario() { 

  const pFecha = this.formatDate(this.fecha);

    this.ventasService.listarVentasIdUsuario(this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        if(resp[1][0].Mensaje == 'Ok') {
          this.ventas = resp[0];
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: () => {  this.alertService.alertFail('Ocurrio un error',false,400); }
    });

  }


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarVentasIdUsuario();
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

  if ( desde >= this.totalProveedores ) {
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
