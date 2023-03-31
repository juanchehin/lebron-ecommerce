import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-editar-unidad',
  templateUrl: './editar-unidad.component.html',
  styles: []
})
export class EditarUnidadComponent implements OnInit {

  unidad: any;
  nombre_corto: any;
  id_unidad: any;
  unidadData: any;

  constructor(
    private router: Router, 
    public activatedRoute: ActivatedRoute,
    public unidadesService: UnidadesService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.id_unidad = this.activatedRoute.snapshot.paramMap.get('IdUnidad');
    this.cargarDatosFormEditarUnidad();
  }

// ==================================================
//        Crear 
// ==================================================

editarUnidad() {

  const unidadEditado = new Array(
    this.id_unidad,
    this.unidad,
    this.nombre_corto
  );

  this.unidadesService.editarUnidad( unidadEditado )
            .subscribe( {
              next: (resp: any) => {
              
                if ( (resp != null) && (resp.mensaje == 'Ok') ) {
                  this.alertService.alertSuccess('top-end','Unidad actualizada',false,2000);
                  this.router.navigate(['/dashboard/productos/unidades']);
                } else {
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000)
                }
                return;
               },
              error: () => { this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000) }
            });

        };

// ==================================================
// Carga
// ==================================================

cargarDatosFormEditarUnidad() {

    this.unidadesService.cargarDatosFormEditarUnidad( this.id_unidad )
    .subscribe( {
      next: (resp: any) => {

        if ( (resp != null) && (resp[1][0].mensaje == 'Ok') ) {
          this.unidadData = resp[0][0];

          this.unidad = this.unidadData.unidad;
          this.nombre_corto = this.unidadData.nombre_corto;
          
        } else {
          this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
        }
        return;
       },
      error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
    });

  }


}
