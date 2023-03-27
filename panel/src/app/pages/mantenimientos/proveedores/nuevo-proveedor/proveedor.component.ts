import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: []
})
export class ProveedorComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;



  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public proveedoresService: ProveedoresService, 
    public activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.forma = new FormGroup({
        Proveedor: new FormControl(null, Validators.required),
        CUIL: new FormControl(null, Validators.required),
        Telefono: new FormControl(null ),
        Apellidos: new FormControl(null ),
        Nombres: new FormControl(null ),
        Email: new FormControl(null, Validators.email ),
        Observaciones: new FormControl(null )
      });
  }

// ==================================================
//        Crear 
// ==================================================

  altaProveedor() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const proveedor = new Array(
        this.forma.value.Proveedor,
        this.forma.value.CUIL,
        this.forma.value.Telefono,
        this.forma.value.Observaciones,
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.Email
      );

      this.proveedoresService.altaProveedor( proveedor )
                .subscribe( (resp: any) => {
                  
                  if ( resp.mensaje === 'Ok') {

                    this.alertService.alertSuccess('top-end','Proveedor cargado',false,2000);
                    
                    this.router.navigate(['/dashboard/proveedores']);
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error',resp.mensaje,false,2000);
                  }
                  return;
                });


              }

}
