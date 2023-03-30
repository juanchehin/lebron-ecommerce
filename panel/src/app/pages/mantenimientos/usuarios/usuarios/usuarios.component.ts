import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('inputUsuarioBuscado') inputUsuarioBuscado!: ElementRef;

  constructor(
    public usuariosService: UsuariosService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarUsuario();
  }

// ==================================================
// Carga
// ==================================================

buscarUsuario() {

  const inputElement: HTMLInputElement = document.getElementById('buscarUsuario') as HTMLInputElement;
  const usuarioBuscado: any = inputElement.value || '-';

  this.usuariosService.buscarUsuariosPaginado( this.desde , usuarioBuscado  )
             .subscribe( {
              next: (resp: any) => {

                if(resp[0].length <= 0)
                { 
                  this.usuarios = [];
                  this.totalUsuarios = 0;
                  
                  return;
                }

                if ( resp[2][0].mensaje == 'Ok') {
                  
                  this.totalUsuarios = resp[1][0].cantUsuariosBuscados;
                  this.usuarios = resp[0];
                } else {
                  this.alertService.alertFail('Ocurrio un error',false,2000);
                }
                return;
               },
              error: () => { 
                this.alertService.alertFail('Ocurrio un error',false,2000)
              }
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
  this.buscarUsuario();

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
  
          if(resp[0][0] != undefined && resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','usuario dado de baja',false,900);
            this.buscarUsuario();
            
          } else {
            this.alertService.alertFail('Ocurrio un error. ',false,1400);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })

  
  }
// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputUsuarioBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.buscarUsuario();

}

}
