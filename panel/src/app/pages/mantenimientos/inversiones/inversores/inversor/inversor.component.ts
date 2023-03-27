import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { InversoresService } from 'src/app/services/inversores.service';

@Component({
  selector: 'app-inversor',
  templateUrl: './inversor.component.html',
  styles: []
})
export class InversorComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public inversoresService: InversoresService, 
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

  altaInversor() {

      if ( this.forma.invalid ) {
        this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',false,2000);
        return;
      }

      const inversor = new Array(
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.DNI,
        this.forma.value.Telefono,
        this.forma.value.Email,
        this.forma.value.Observaciones
      );

      this.inversoresService.altaInversor(  inversor )
      .subscribe({
        next: (resp: any) => { 
  
          if ( resp.mensaje === 'Ok') {
            this.alertService.alertSuccess('top-end','inversor cargado',false,2000);
                    
            this.router.navigate(['/dashboard/inversores']);
            
          } else {
            this.alertService.alertFail('Ocurrio un error : ' + resp.mensaje,false,2000);
          }
          return;
         },
        error: () => { this.alertService.alertFail('Ocurrio un error,contactese con el administrador ',false,2000);
      }
      });
}

}
