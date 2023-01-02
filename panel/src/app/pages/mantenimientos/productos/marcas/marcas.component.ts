import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: []
})
export class MarcasComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  marcas!: any;

  totalMarcas = 0;
  cargando = true;

  constructor(
    private router: Router,
    public marcasService: MarcasService,
    public alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarMarcas();
  }

// ==================================================
// Carga
// ==================================================

cargarMarcas() {

    this.marcasService.listarMarcasPaginado( this.desde  )
               .subscribe(  {
                next: (resp: any) => { 
                
                  if ( resp[2][0].Mensaje === 'Ok') {
                    this.totalMarcas = resp[1][0].cantMarcas;

                    this.marcas = resp[0];

                    this.cargando = false;
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
                  }
                  return;
                 },
                error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
              });
  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalMarcas ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarMarcas();

}

}
