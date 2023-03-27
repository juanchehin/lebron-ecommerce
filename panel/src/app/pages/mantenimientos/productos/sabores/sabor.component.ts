import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SaboresService } from 'src/app/services/sabores.service';

@Component({
  selector: 'app-sabor',
  templateUrl: './sabor.component.html',
  styles: []
})
export class SaborComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public saboresService: SaboresService, 
    public activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.forma = new FormGroup({
        Sabor: new FormControl(null, Validators.required),
        Descripcion: new FormControl(null )
      });
  }

// ==================================================
//        Crear 
// ==================================================

  altaSabor() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const sabor = new Array(
        this.forma.value.Sabor,
        this.forma.value.Descripcion
      );

      this.saboresService.altaSabor( sabor )
                .subscribe( (resp: any) => {

                  if ( resp.mensaje === 'Ok') {

                    this.alertService.alertSuccess('top-end','Sabor cargado',false,2000);
                    
                    this.router.navigate(['/dashboard/productos/sabores']);
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error',resp.mensaje,false,2000);
                  }
                  return;
                });
        }

}
