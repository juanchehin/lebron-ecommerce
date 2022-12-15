import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

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

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  // ==============================
  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

// ==================================================
//
// ==================================================
  listarComprasFecha(desde: number , FechaInicio: string , FechaFin: string){

    let url = URL_SERVICIOS + '/compras/listar/' + desde + '/' + FechaInicio + '/' + FechaFin;

    return this.http.get( url );
  }

// ==================================================
//
// ==================================================
altaCompra( compra : any){

  let url = URL_SERVICIOS + '/compras/alta/' + this.IdPersona;  // < -- chechear en back que sea mismo usuario

  return this.http.post( url, compra,this.headers );
}

// ==================================================
//
// ==================================================
listarComprasIdUsuario(desde: number , Fecha: string ){

  let url = URL_SERVICIOS + '/compras/listar/mis-compras/' + desde + '/' + Fecha + '/' + this.IdPersona;

  return this.http.get( url );
}


}
