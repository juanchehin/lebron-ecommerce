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
                  
                    if ( (resp != null) && (resp.mensaje == 'Ok') ) {
                      this.alertService.alertSuccess('top-end','Inversor actualizado',false,2000);
                      this.router.navigate(['/dashboard/inversores']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. ' + resp,false,2000);
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
                  
                this.Apellidos = resp[0][0].Apellidos;
                this.Nombres = resp[0][0].Nombres;
                this.Telefono = resp[0][0].Telefono;
                this.DNI = resp[0][0].DNI;
                this.Email = resp[0][0].Email;
                this.Observaciones = resp[0][0].Observaciones;
                this.montoInvertido = resp[0][0].montoInvertido || 0;

             
              },
              error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
            });

        };
}
