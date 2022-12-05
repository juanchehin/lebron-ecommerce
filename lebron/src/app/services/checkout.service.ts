import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private cantidadProductoSource = new BehaviorSubject<string>('');
  cantidad = this.cantidadProductoSource.asObservable()

  // ==============================
  get IdPersona(): any {
    if(this.authService.IdPersona)
    {
      return this.authService.IdPersona;
    }
    else
    {
      return localStorage.getItem('id') || '';
    }
  }


  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  // ==============================
  changeCantidad(cantidad: string) {
    this.cantidadProductoSource.next(cantidad);
  }

// ==================================================
//
// ==================================================
dameDatosComprarAhora(IdPersona: any,IdProducto: any){

    let url = URL_SERVICIOS + '/checkout/datos-comprar-ahora/' + IdPersona + '/' + IdProducto;

    return this.http.get( url );
  }
// ==================================================
//
// ==================================================
confirmarCompra(datosCompra: any, costoEnvio: any, pIdEnvioSeleccionado: any, pTotal: any){

  let url = URL_SERVICIOS + '/checkout/payment/new/' + costoEnvio + '/' + pIdEnvioSeleccionado + '/' + this.IdPersona + '/' + pTotal;

  return this.http.post( url, datosCompra );
}
  


}
