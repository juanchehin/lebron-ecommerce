import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private cantidadProductoSource = new BehaviorSubject<string>('');
  cantidad = this.cantidadProductoSource.asObservable()

  constructor(private http: HttpClient) { }

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


}
