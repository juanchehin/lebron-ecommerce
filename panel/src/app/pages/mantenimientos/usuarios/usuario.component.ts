import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;



  constructor(
    private router: Router, 
    public usuariosService: UsuariosService, 
    public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe( (params: any) => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
      }

    });

  }

  ngOnInit() {
    this.forma = new FormGroup({
        Apellidos: new FormControl(null, Validators.required),
        Nombres: new FormControl(null, Validators.required),
        Telefono: new FormControl(null, Validators.required ),
        DNI: new FormControl(null),
        Password: new FormControl(null ),
        Password2: new FormControl(null ),
        Email: new FormControl(null),
        Observaciones: new FormControl(null),
        FechaNac: new FormControl(null, Validators.required  )
      });
  }

// ==================================================
//        Crear 
// ==================================================

  altaUsuario() {

      if ( this.forma.invalid ) {
        return;
      }

      const plan = new Array(
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.Telefono,
        this.forma.value.DNI,
        this.forma.value.Pass,
        this.forma.value.Email,
        this.forma.value.Observaciones,
        this.forma.value.FechaNac
      );

      this.usuariosService.altaUsuario( plan )
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
