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

    let url = URL_SERVICIOS + '/compras/listar/' + desde + '/' + FechaInicio + '/' + FechaFin + '/' + this.IdPersona;

    return this.http.get( url,this.headers );
  }

// ==================================================
//
// ==================================================
altaCompra( compra : any){

  let url = URL_SERVICIOS + '/compras/alta/' + this.IdPersona;

  return this.http.post( url, compra,this.headers );
}

// ==================================================
//
// ==================================================
listarComprasIdUsuario(desde: number , Fecha: string ){

  let url = URL_SERVICIOS + '/compras/listar/mis-compras/' + desde + '/' + Fecha + '/' + this.IdPersona;

  return this.http.get( url );
}


// ==================================================
//
// ==================================================
altaGasto( gasto : any){

  let url = URL_SERVICIOS + '/compras/gastos/alta/' + this.IdPersona;

  return this.http.post( url, gasto,this.headers );
}

// ==================================================
//
// ==================================================
listarGastosPaginado(desde: number , fecha: string ){

  let url = URL_SERVICIOS + '/compras/gastos/listar/' + desde + '/' + fecha + '/' + this.IdPersona;

  return this.http.get( url,this.headers );
}

}
