import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor() { }

  // ==============================
  alertSuccess(pPosition: any,pTitulo: any,pShowConfirmButton: boolean,pTimer: any) {

      Swal.fire({
        position: pPosition,
        icon: 'success',
        title: pTitulo,
        showConfirmButton: pShowConfirmButton,
        timer: pTimer
      });

  }

 // ==============================
 alertFail(pTitulo: any,pShowConfirmButton: boolean,pTimer: any) {

  Swal.fire({
    icon: 'error',
    title: pTitulo,
    showConfirmButton: pShowConfirmButton,
    timer: pTimer
  });

}

// ==============================
 alertConfirm(pTitulo: any,pSubTitulo: any): any {  

  Swal.fire({
    title: pTitulo,
    text: pSubTitulo,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {

    return result;

  }) 
  
}

}
