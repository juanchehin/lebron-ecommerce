import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styles: []
})
export class NuevoGastoComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public comprasService: ComprasService, 
    public activatedRoute: ActivatedRoute
    ) {
    activatedRoute.params.subscribe( (params: any) => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
      }

    });

  }

  ngOnInit() {
    this.forma = new FormGroup({
        Monto: new FormControl(null, Validators.required),
        Descripcion: new FormControl(null, Validators.required )
      });
  }

// ==================================================
//        Crear 
// ==================================================

  altaGasto() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const gasto = new Array(
        this.forma.value.Monto,
        this.forma.value.Descripcion
      );

      this.comprasService.altaGasto( gasto )
                .subscribe( (resp: any) => {
                  
                  if ( resp.Mensaje === 'Ok') {

                    this.alertService.alertSuccess('top-end','Gasto cargado',false,2000);
                    
                    this.router.navigate(['/dashboard/gastos']);
                  } else {
                    this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                  }
                  return;
                });


              }

}
