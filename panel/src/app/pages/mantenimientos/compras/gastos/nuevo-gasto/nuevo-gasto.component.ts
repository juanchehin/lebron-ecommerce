import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ComprasService } from 'src/app/services/compras.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styles: []
})
export class NuevoGastoComponent implements OnInit {

  fecha_gasto: any;
  monto: any;
  descripcion: any;


  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public comprasService: ComprasService, 
    public activatedRoute: ActivatedRoute,
    private utilService: UtilService
    ) {

  }

  ngOnInit() {
    this.fecha_gasto = this.utilService.formatDateNow(new Date(Date.now()));
  }

// ==================================================
//        Crear 
// ==================================================

  altaGasto() {

      if ( this.monto <= 0 ) {
        this.alertService.alertFail('El monto debe ser mayor a cero',false,2000);
        return;
      }

      const gasto = new Array(
        this.monto,
        this.fecha_gasto,
        this.descripcion
      );

      this.comprasService.altaGasto( gasto )
                .subscribe( {
                  next: (resp: any) => { 

                  
                  if ( resp.mensaje === 'Ok') {

                    this.alertService.alertSuccess('top-end','Gasto cargado',false,2000);
                    
                    this.router.navigate(['/dashboard/compras/gastos']);
                  } else {
                    this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                  }
                  return;

              },
              error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
            });
    }
}