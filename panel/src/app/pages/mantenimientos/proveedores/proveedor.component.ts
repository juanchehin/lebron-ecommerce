import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';

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
    public proveedoresService: ProveedoresService, 
    public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe( (params: any) => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
      }

    });

  }

  ngOnInit() {
    this.forma = new FormGroup({
        Proveedor: new FormControl(null, Validators.required),
        CUIL: new FormControl(null, Validators.required),
        Telefono: new FormControl(null, Validators.required ),
        Observaciones: new FormControl(null, Validators.required )
      });
  }

// ==================================================
//        Crear 
// ==================================================

  altaProveedor() {

      if ( this.forma.invalid ) {
        return;
      }

      const proveedor = new Array(
        this.forma.value.Proveedor,
        this.forma.value.CUIL,
        this.forma.value.Telefono,
        this.forma.value.Observaciones
      );

      this.proveedoresService.altaProveedor( proveedor )
                .subscribe( (resp: any) => {
                  console.log("resp en plan es : ",resp)
                  if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Plan cargado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/mantenimiento/planes']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Hubo un problema al cargar',
                      text: 'Contactese con el administrador',
                    });
                  }
                  return;
                });


              }
}
