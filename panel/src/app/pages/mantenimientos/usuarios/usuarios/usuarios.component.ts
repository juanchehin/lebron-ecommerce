import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;

  usuarios!: any;
  cantPlanes = 0;

  totalUsuarios = 0;
  cargando = true;

  constructor(
    public usuariosService: UsuariosService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.cargarUsuarios();
  }

// ==================================================
// Carga
// ==================================================

  cargarUsuarios() {

    this.usuariosService.listarUsuariosPaginado( this.desde  )
               .subscribe( (resp: any) => {

                this.totalUsuarios = resp[1][0].cantUsuarios;

                this.usuarios = resp[0];

              });

  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalUsuarios ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarUsuarios();

}


// ==================================================
// 
// ==================================================

bajaUsuario(IdUsuario: string) {

  Swal.fire({
    title: '¿Desea eliminar el usuario?',
    text: "Eliminacion de usuario",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.usuariosService.bajaUsuario( IdUsuario )
      .subscribe({
        next: (resp: any) => { 
  
          if(resp[0][0] != undefined && resp[0][0].Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','usuario dado de baja',false,900);
            this.cargarUsuarios();
            
          } else {
            this.alertService.alertFail('Ocurrio un error. ',false,1400);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].Mensaje,false,1200); }
      });
    }
  })

  
  }


}
