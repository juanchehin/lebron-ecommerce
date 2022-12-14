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
              
                if ( (resp != null) && (resp.Mensaje == 'Ok') ) {
                  this.alertService.alertSuccess('top-end','Sabor actualizada',false,2000);
                  this.router.navigate(['/dashboard/productos/sabores']);
                } else {
                  this.alertService.alertFail('Ocurrio un error. ' + resp,false,2000);
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

  console.log("this.IdProducto editar perod es : ",this.IdSabor)

    this.saboresService.cargarDatosFormEditarSabor( this.IdSabor )
    .subscribe( {
      next: (resp: any) => {

        console.log("resp es ;",resp)
      
        if ( (resp != null) && (resp[1][0].Mensaje == 'Ok') ) {
          this.saborData = resp[0][0];

          this.Sabor = this.saborData.Sabor;
          this.Descripcion = this.saborData.Descripcion;
          
        } else {
          this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
        }
        return;
       },
      error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
    });

  }


}
