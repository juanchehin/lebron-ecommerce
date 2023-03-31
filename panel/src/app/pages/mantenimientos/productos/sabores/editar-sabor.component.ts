import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SaboresService } from 'src/app/services/sabores.service';

@Component({
  selector: 'app-editar-sabor',
  templateUrl: './editar-sabor.component.html',
  styles: []
})
export class EditarSaborComponent implements OnInit {

  Sabor: any;
  Descripcion: any;
  IdSabor: any;
  saborData: any;

  constructor(
    private router: Router, 
    public activatedRoute: ActivatedRoute,
    public saboresService: SaboresService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdSabor = this.activatedRoute.snapshot.paramMap.get('IdSabor');
    this.cargarDatosFormEditarSabor();
  }

// ==================================================
//        Crear 
// ==================================================

editarSabor() {

  const saborEditado = new Array(
    this.IdSabor,
    this.Sabor,
    this.Descripcion
  );

  this.saboresService.editarSabor( saborEditado )
            .subscribe( {
              next: (resp: any) => {
                console.log('resp::: ', resp);
              
                if ( (resp != null) && (resp.mensaje == 'Ok') ) {
                  this.alertService.alertSuccess('top-end','Sabor actualizada',false,2000);
                  this.router.navigate(['/dashboard/productos/sabores']);
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

cargarDatosFormEditarSabor() {

    this.saboresService.cargarDatosFormEditarSabor( this.IdSabor )
    .subscribe( {
      next: (resp: any) => {

        if ( (resp != null) && (resp[1][0].mensaje == 'Ok') ) {
          this.saborData = resp[0][0];

          this.Sabor = this.saborData.sabor;
          this.Descripcion = this.saborData.descripcion;
          
        } else {
          this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
        }
        return;
       },
      error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
    });

  }


}
