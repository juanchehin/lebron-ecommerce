import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: []
})
export class CategoriaComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public categoriaService: CategoriasService, 
    public activatedRoute: ActivatedRoute
    ) {
      

  }

  ngOnInit() {
    this.forma = new FormGroup({      
      Categoria: new FormControl(null, Validators.required ),
      Descripcion: new FormControl(null )
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

      const categoria = new Array(
        this.forma.value.Categoria,
        this.forma.value.Descripcion
      );

      this.categoriaService.altaCategoria( categoria )
                .subscribe( (resp: any) => {
                  
                  if ( resp[0][0].mensaje == 'Ok') {

                    this.alertService.alertSuccess('top-end','Categoria cargado',false,2000);
                    
                    this.router.navigate(['/dashboard/productos/categorias']);
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error : ',resp[0][0].mensaje,false,2000);
                  }
                  return;
                });


              }

}
