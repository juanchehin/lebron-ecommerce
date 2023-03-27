import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { InversoresService } from 'src/app/services/inversores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baja-monto',
  templateUrl: './baja-monto.component.html',
  styles: []
})
export class BajaMontoInversionComponent implements OnInit {

  forma!: FormGroup;
  IdInversor: any;
  Apellidos: any;
  Nombres: any;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public inversoresService: InversoresService, 
    public clientesService: ClientesService, 
    public activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.IdInversor = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarDatosInversor();
    this.forma = new FormGroup({      
      monto: new FormControl(null, Validators.required ),
      observaciones: new FormControl(null )
    });
  }

// ==================================================
//        Crear 
// ==================================================

  bajaInversion() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const inversion = new Array(
        this.IdInversor,
        this.forma.value.monto,
        this.forma.value.observaciones
      );

      Swal.fire({
        title: '¿Desea confirmar la baja de inversion?',
        text: "Inversor : " + this.Apellidos + " " + this.Nombres,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.inversoresService.bajaMontoInversion( inversion )
                .subscribe( (resp: any) => {
                  
                  if ( resp.mensaje == 'Ok') {

                    this.alertService.alertSuccess('top-end','Operacion cargada',false,2000);
                    
                    this.router.navigate(['/dashboard/inversores']);
                  } else {
                    this.alertService.alertFail('Ocurrio un error : ' + resp[0][0].mensaje,false,2000);
                  }
                  return;
                });


              }
      })
    
    }
// ==================================================
//        
// ==================================================

cargarDatosInversor()
{
  this.clientesService.cargarDatosFormEditarCliente( this.IdInversor )
        .subscribe( {
        next: (resp: any) => {
          
        this.Apellidos = resp[0][0].Apellidos;
        this.Nombres = resp[0][0].Nombres;

      },
      error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
      });

};

}
