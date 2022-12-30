import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styles: []
})
export class SubCategoriaComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;
  categorias: any;
  IdCategoria: any;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public categoriaService: CategoriasService, 
    public activatedRoute: ActivatedRoute
    ) {
      

  }

  ngOnInit() {
    this.cargarCategorias();
    this.forma = new FormGroup({      
      Categoria: new FormControl(null, Validators.required ),
      Descripcion: new FormControl(null )
    });
  }

  // ==================================================
// cargarCategorias
// ==================================================

cargarCategorias() {

  this.categoriaService.listarCategorias( )
             .subscribe( {
              next: (resp: any) => { 

                console.log("resp es : ",resp);

                if(resp.Mensaje == 'Ok')
                { 
                  this.categorias = resp[0];
                  return;
                } else {
                  this.alertService.alertFailWithText('Ocurrio un error',resp[2][0].Mensaje,false,2000);
                }
                return;
               },
              error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
            });

}

// ==================================================
//        Crear 
// ==================================================

  altaCategoria() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const cliente = new Array(
        this.forma.value.Categoria,
        this.forma.value.Descripcion
      );

      this.categoriaService.altaCategoria( cliente )
                .subscribe( (resp: any) => {
                  
                  if ( resp[0][0].Mensaje == 'Ok') {

                    this.alertService.alertSuccess('top-end','Categoria cargado',false,2000);
                    
                    this.router.navigate(['/dashboard/productos/categorias']);
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error : ',resp[0][0].Mensaje,false,2000);
                  }
                  return;
                });


              }

}
