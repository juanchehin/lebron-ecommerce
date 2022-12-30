import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-editar-subcategoria',
  templateUrl: './editar-subcategoria.component.html',
  styles: []
})
export class EditarSubcategoriaComponent implements OnInit {

  IdCategoria: any;
  Categoria: any;
  Descripcion: any;

  constructor(
    private router: Router, 
    public categoriasService: CategoriasService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdCategoria = this.activatedRoute.snapshot.paramMap.get('IdCategoria');
    this.cargarDatosFormEditarCategoria();
  }
  // ==================================================
// Carga
// ==================================================

cargarDatosFormEditarCategoria() {

  this.categoriasService.cargarDatosFormEditarCategoria( this.IdCategoria  )
             .subscribe( {
              next: (resp: any) => {

                if ( (resp != null) && (resp[1][0].Mensaje == 'Ok') ) {
                  this.Categoria = resp[0][0].Categoria;
                  this.Descripcion = resp[0][0].Descripcion;
                } else {
                  this.alertService.alertFail('Ocurrio un error. ' + resp,false,2000);
                }
                return;
            },
            error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
          });

      };
// ==================================================
//        Crear 
// ==================================================

editarCategoria() {

      const categoriaEditado = new Array(
        this.Categoria,
        this.Descripcion
      );

      this.categoriasService.editarCategoria(this.IdCategoria, categoriaEditado )
                .subscribe( {
                  next: (resp: any) => {
                  
                    if ( (resp != null) && (resp.Mensaje == 'Ok') ) {
                      this.alertService.alertSuccess('top-end','Categoria actualizada',false,2000);
                      this.router.navigate(['/dashboard/productos/categorias']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. ' + resp,false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
                });

            };


}
