import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
import { UnidadesService } from '../../../../services/unidades.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styles: []
})
export class EditarProveedorComponent implements OnInit {

  Proveedor: any;
  CUIL: any;
  Apellidos: any;
  Nombres: any;
  proveedores: any;
  Telefono: any;
  Email: any;
  Observaciones: any;
  IdProveedor: any;
  proveedorData: any;

  constructor(
    private router: Router, 
    public proveedoresService: ProveedoresService, 
    public activatedRoute: ActivatedRoute,
    public marcasService: MarcasService,
    public categoriasService: CategoriasService,
    public unidadesService: UnidadesService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdProveedor = this.activatedRoute.snapshot.paramMap.get('IdProveedor');
    this.cargarDatosFormEditarProveedor();

  }

// ==================================================
//        Crear 
// ==================================================

editarProveedor() {

  const proveedorEditado = new Array(
    this.IdProveedor,
    this.Proveedor,
    this.Apellidos,
    this.Nombres,
    this.Telefono,
    this.CUIL,        
    this.Email,
    this.Observaciones
  );

  this.proveedoresService.editarProveedor( proveedorEditado )
            .subscribe( {
              next: (resp: any) => {
              
                if ( (resp != null) && (resp.mensaje == 'Ok') ) {
                  this.alertService.alertSuccess('top-end','Proveedor actualizado',false,2000);
                  this.router.navigate(['/dashboard/proveedores']);
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

cargarDatosFormEditarProveedor() {

    this.proveedoresService.cargarDatosFormEditarProveedor( this.IdProveedor )
    .subscribe( {
      next: (resp: any) => {

        console.log("resp es ;",resp)
      
        if ( (resp != null) && (resp[1][0].mensaje == 'Ok') ) {
          this.proveedorData = resp[0][0];

          this.Proveedor = this.proveedorData.Proveedor;
          this.CUIL = this.proveedorData.DNI;
          this.Apellidos = this.proveedorData.Apellidos;
          this.Nombres = this.proveedorData.Nombres;        
          this.Telefono = this.proveedorData.Telefono;
          this.Email = this.proveedorData.Email;
          this.Observaciones = this.proveedorData.Observaciones;
        } else {
          this.alertService.alertFail('Ocurrio un error. . Contactese con el administrador',false,2000);
        }
        return;
       },
      error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
    });

  }


}
