import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente-cuenta',
  templateUrl: './editar-cliente-cuenta.component.html',
  styles: []
})
export class EditarClienteCuentaComponent implements OnInit {

  IdPersona: any;
  Apellidos: any;
  Nombres: any;
  Telefono: any;
  DNI: any;        
  Email: any;
  Observaciones: any;   

  constructor(
    private router: Router, 
    public clientesService: ClientesService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarDatosFormEditarProducto();
  }

// ==================================================
//        Crear 
// ==================================================

editarCliente() {

      const clienteEditado = new Array(
        this.Apellidos,
        this.Nombres,
        this.Telefono,
        this.DNI,        
        this.Email,
        this.Observaciones,
        this.IdPersona,
      );

      this.clientesService.editarCliente( clienteEditado )
                .subscribe( {
                  next: (resp: any) => {
                  
                    if ( (resp != null) && (resp.mensaje == 'Ok') ) {
                      this.alertService.alertSuccess('top-end','Cliente actualizado',false,2000);
                      this.router.navigate(['/dashboard/clientes']);
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

cargarDatosFormEditarProducto() {

    this.clientesService.cargarDatosFormEditarCliente( this.IdPersona )
               .subscribe( {
                next: (resp: any) => {
                  
                this.Apellidos = resp[0][0].Apellidos;
                this.Nombres = resp[0][0].Nombres;
                this.Telefono = resp[0][0].Telefono;
                this.DNI = resp[0][0].DNI;
                this.Email = resp[0][0].Email;
                this.Observaciones = resp[0][0].Observaciones;
             
              },
              error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
            });

        };
}
