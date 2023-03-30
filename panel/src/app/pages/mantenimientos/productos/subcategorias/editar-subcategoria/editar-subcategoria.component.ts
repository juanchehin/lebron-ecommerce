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
  IdSubCategoria: any;
  categorias: any;
  SubCategoria: any;
  Descripcion: any;

  constructor(
    private router: Router, 
    public categoriasService: CategoriasService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdSubCategoria = this.activatedRoute.snapshot.paramMap.get('IdSubCategoria');
    this.cargarDatosFormEditarCategoria();
  }

// ==================================================
// Carga
// ==================================================

cargarDatosFormEditarCategoria() {

  this.categoriasService.cargarDatosFormEditarSubCategoria( this.IdSubCategoria  )
             .subscribe( {
              next: (resp: any) => {
                  
                if ( (resp != null) && (resp[2][0].mensaje == 'Ok') ) {

                  this.categorias = resp[0];

                  this.IdCategoria = resp[1][0].id_categoria;
                  this.SubCategoria = resp[1][0].subcategoria;
                  this.Descripcion = resp[1][0].descripcion;
                  
                } else {
                  this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                }
                return;
               },
            error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
          });

      };
// ==================================================
//        editarSubCategoria 
// ==================================================

editarSubCategoria() {

      const subcategoriaEditado = new Array(
        this.IdCategoria,
        this.SubCategoria,
        this.Descripcion
      );

      this.categoriasService.editarSubCategoria(this.IdSubCategoria, subcategoriaEditado )
                .subscribe( {
                  next: (resp: any) => {
                  
                    if ( (resp != null) && (resp[0][0].mensaje == 'Ok') ) {

                      this.alertService.alertSuccess('top-end','SubCategoria actualizada',false,2000);
                      this.router.navigate(['/dashboard/productos/subcategorias']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. ' + resp,false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
                });

            };


 

}
