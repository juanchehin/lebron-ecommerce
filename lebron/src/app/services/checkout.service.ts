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
  cantidadProducto = this.cantidadProductoSource.asObservable()

  private cantidadPromocionSource = new BehaviorSubject<string>('');
  cantidadPromocion = this.cantidadPromocionSource.asObservable()

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
  changeCantidadProducto(cantidadProducto: string) {
    this.cantidadProductoSource.next(cantidadProducto);
  }

  // ==============================
  changeCantidadPromocion(cantidadPromocion: string) {
    this.cantidadPromocionSource.next(cantidadPromocion);
  }

// ==================================================
//
// ==================================================
dameDatosComprarAhora(IdPersona: any,IdProductoPromo: any,tipo: any){

  if(tipo == 'producto')
  {
    let url = URL_SERVICIOS + '/checkout/datos-comprar-ahora/' + IdPersona + '/' + IdProductoPromo;

    return this.http.get( url );
  }
  else
  {
    let url = URL_SERVICIOS + '/checkout/datos-comprar-ahora/promocion/' + IdPersona + '/' + IdProductoPromo;

    return this.http.get( url );
  }

    
  }
// ==================================================
//
// ==================================================
confirmarCompra(datosCompra: any, costoEnvio: any, pIdEnvioSeleccionado: any, pTotal: any){

  let url = URL_SERVICIOS + '/checkout/payment/new/' + costoEnvio + '/' + pIdEnvioSeleccionado + '/' + this.IdPersona + '/' + pTotal;

  return this.http.post( url, datosCompra );
}
  


}
