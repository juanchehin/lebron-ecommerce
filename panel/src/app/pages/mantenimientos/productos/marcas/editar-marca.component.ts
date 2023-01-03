import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styles: []
})
export class EditarMarcaComponent implements OnInit {

  Marca: any;
  Descripcion: any;
  IdMarca: any;
  marcaData: any;

  constructor(
    private router: Router, 
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdMarca = this.activatedRoute.snapshot.paramMap.get('IdMarca');
    this.cargarDatosFormEditarMarca();
  }

// ==================================================
//        Crear 
// ==================================================

editarMarca() {

  const marcaEditado = new Array(
    this.IdMarca,
    this.Marca,
    this.Descripcion
  );

  this.marcasService.editarMarca( marcaEditado )
            .subscribe( {
              next: (resp: any) => {
              
                if ( (resp != null) && (resp.Mensaje == 'Ok') ) {
                  this.alertService.alertSuccess('top-end','Marca actualizada',false,2000);
                  this.router.navigate(['/dashboard/productos/marcas']);
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

cargarDatosFormEditarMarca() {

  console.log("this.IdProducto editar perod es : ",this.IdMarca)

    this.marcasService.cargarDatosFormEditarMarca( this.IdMarca )
    .subscribe( {
      next: (resp: any) => {

        console.log("resp es ;",resp)
      
        if ( (resp != null) && (resp[1][0].Mensaje == 'Ok') ) {
          this.marcaData = resp[0][0];

          this.Marca = this.marcaData.Marca;
          this.Descripcion = this.marcaData.Descripcion;
          
        } else {
          this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
        }
        return;
       },
      error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
    });

  }


}
