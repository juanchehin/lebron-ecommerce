import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: []
})
export class CuentaComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public clientesService: ClientesService, 
    public activatedRoute: ActivatedRoute
    ) {
      

  }

  ngOnInit() {
    this.forma = new FormGroup({      
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      DNI: new FormControl(null),
      Telefono: new FormControl(null ),
      Email: new FormControl(null, Validators.email ),
      Observaciones: new FormControl(null )
    });
  }

// ==================================================
//        Crear 
// ==================================================

  altaCliente() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const cliente = new Array(
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.DNI,
        this.forma.value.Telefono,
        this.forma.value.Email,
        this.forma.value.Observaciones
      );

      this.clientesService.altaCliente( cliente )
                .subscribe( (resp: any) => {
                  
                  if ( resp[0][0].mensaje == 'Ok') {

                    this.alertService.alertSuccess('top-end','cliente cargado',false,2000);
                    
                    this.router.navigate(['/dashboard/clientes']);
                  } else {
                    this.alertService.alertFail('Ocurrio un error : ' + resp[0][0].mensaje,false,2000);
                  }
                  return;
                });


              }

}
