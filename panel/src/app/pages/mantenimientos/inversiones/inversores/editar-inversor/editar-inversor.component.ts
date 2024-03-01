import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { InversoresService } from 'src/app/services/inversores.service';

@Component({
  selector: 'app-editar-inversor',
  templateUrl: './editar-inversor.component.html',
  styles: []
})
export class EditarInversorComponent implements OnInit {

  IdPersona: any;
  Apellidos: any;
  Nombres: any;
  Telefono: any;
  DNI: any;        
  Email: any;
  Observaciones: any;   
  montoInvertido = 0;

  constructor(
    private router: Router, 
    public inversoresService: InversoresService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarDatosFormEditarInversor();
  }

// ==================================================
//        Crear 
// ==================================================

editarInversor() {

      const inversorEditado = new Array(
        this.Apellidos,
        this.Nombres,
        this.Telefono,
        this.DNI,        
        this.Email,
        this.Observaciones,
        this.IdPersona
      );

      this.inversoresService.editarInversor( inversorEditado )
                .subscribe( {
                  next: (resp: any) => {
                    
                    if ( (resp[0][0].mensaje == 'ok') ) {
                      this.alertService.alertSuccess('top-end','Inversor actualizado',false,2000);
                      this.router.navigate(['/dashboard/inversiones/inversores']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
                });

            };

  // ==================================================
// Carga
// ==================================================

cargarDatosFormEditarInversor() {

    this.inversoresService.cargarDatosFormEditarInversor( this.IdPersona )
               .subscribe( {
                next: (resp: any) => {

                  if(resp[1][0].mensaje == 'ok'){

                    this.Apellidos = resp[0][0].apellidos;
                    this.Nombres = resp[0][0].nombres;
                    this.Telefono = resp[0][0].telefono;
                    this.DNI = resp[0][0].dni;
                    this.Email = resp[0][0].email;
                    this.Observaciones = resp[0][0].observaciones;
                  }else{
                    this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000)
                  }
              },
              error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
            });

        };
}
