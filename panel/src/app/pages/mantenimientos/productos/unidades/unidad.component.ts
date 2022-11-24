import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styles: []
})
export class UnidadComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;
  marcas: any;
  categorias: any;
  codigo: any;
  banderaGenerarCodigo = false;

  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    
    ) {
    activatedRoute.params.subscribe( (params: any) => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
      }

    });

  }

  ngOnInit() {

    this.forma = new FormGroup({
      Unidad: new FormControl(null, Validators.required ),
      NombreCorto: new FormControl(null, Validators.required)
      });
  }

// ==================================================
//        Crear 
// ==================================================

altaUnidad() {

      if ( this.forma.invalid ) {
        return;
      }

      const unidad = new Array(
        this.forma.value.Unidad,
        this.forma.value.NombreCorto
       
      );

      this.productosService.altaUnidad( unidad )
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
                    this.router.navigate(['/dashboard/unidades']);
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
