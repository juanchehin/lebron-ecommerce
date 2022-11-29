import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


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

  constructor() { }
}
