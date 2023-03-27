import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styles: []
})
export class MarcaComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public marcasService: MarcasService, 
    public activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.forma = new FormGroup({
        Marca: new FormControl(null, Validators.required),
        Descripcion: new FormControl(null )
      });
  }

// ==================================================
//        Crear 
// ==================================================

  altaMarca() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const marca = new Array(
        this.forma.value.Marca,
        this.forma.value.Descripcion
      );

      this.marcasService.altaMarca( marca )
                .subscribe( (resp: any) => {
                  
                  if ( resp.mensaje === 'Ok') {

                    this.alertService.alertSuccess('top-end','Marca cargada',false,2000);
                    
                    this.router.navigate(['/dashboard/productos/marcas']);
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error',resp.mensaje,false,2000);
                  }
                  return;
                });
        }

}
