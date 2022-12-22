import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;



  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public clientesService: ClientesService, 
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
        cliente: new FormControl(null, Validators.required),
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

  altaCliente() {

      // if ( this.forma.invalid ) {
      //   this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
      //   return;
      // }

      // const cliente = new Array(
      //   this.forma.value.cliente,
      //   this.forma.value.CUIL,
      //   this.forma.value.Telefono,
      //   this.forma.value.Observaciones,
      //   this.forma.value.Apellidos,
      //   this.forma.value.Nombres,
      //   this.forma.value.Email
      // );

      // this.proveedoresService.altaCliente( cliente )
      //           .subscribe( (resp: any) => {
                  
      //             if ( resp.Mensaje === 'Ok') {

      //               this.alertService.alertSuccess('top-end','cliente cargado',false,2000);
                    
      //               this.router.navigate(['/dashboard/proveedores']);
      //             } else {
      //               this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
      //             }
      //             return;
      //           });


              }

}
