import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styles: []
})
export class UnidadComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
    ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      Unidad: new FormControl(null, Validators.required ),
      NombreCorto: new FormControl(null, Validators.required)
      });
  }

// ==================================================
//        Crear 
// ==================================================

altaUnidad() {

      if ( this.forma.invalid ) {
        return;
      }

      const unidad = new Array(
        this.forma.value.Unidad,
        this.forma.value.NombreCorto
       
      );

      this.productosService.altaUnidad( unidad )
                .subscribe(  {
                  next: (resp: any) => {
                  if ( resp[0][0].Mensaje == 'Ok') {       
                   this.alertService.alertSuccess('top-end','Unidad creada',false,900);
                   this.router.navigate(['/dashboard/productos/unidades']);
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error',resp[0][0].Mensaje || resp[0][0].Message,false,2000);
                  }
                  return;
                 },
                error: (err: any) => { 
                 this.alertService.alertFail('Ocurrio un error',false,2000) 
               
               }
        });
}


}
