import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;

  clientes!: any;
  cantPlanes = 0;

  totalClientes = 0;
  cargando = true;

  constructor(
    public clientesService: ClientesService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarClientes();
  }

// ==================================================
// Carga
// ==================================================

buscarClientes() {

    const inputElement: HTMLInputElement = document.getElementById('clienteBuscado') as HTMLInputElement;
    const clienteBuscado: any = inputElement.value || null;

    this.clientesService.buscarClientesPaginado( this.desde, 2, clienteBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[2] && resp[2][0].Mensaje == 'Ok')
                  { 
                    this.totalClientes = resp[1][0].cantClientes;
    
                    this.clientes = resp[0];
                    return;
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
// 
// ==================================================

bajaCliente(IdPersona: string) {

  Swal.fire({
    title: '¿Desea eliminar el cliente?',
    text: "Eliminacion de cliente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.clientesService.bajaCliente( IdPersona )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0].Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Cliente dado de baja',false,900);
            this.buscarClientes();
            
          } else {
            this.alertService.alertFail(resp[0][0].Mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].Mensaje,false,1200); }
      });
    }
  })

  
  }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalClientes ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarClientes();

}

}
