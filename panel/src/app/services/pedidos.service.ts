import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }
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

// ==================================================
//
// ==================================================
listarPedidosPaginado(desde: any,fecha: any){
  

    let url = URL_SERVICIOS + '/pedidos/listar/' + desde + '/' + fecha;

    return this.http.get( url );
  }

// ==================================================
//
// ==================================================
  confirmarPedido( IdPedido: any ) {

    let url = URL_SERVICIOS + '/pedidos/confirmar';

    var body = new Array();

    body.push(IdPedido,this.IdPersona);
  
    return this.http.post(
      url,
      body,
      {
        headers: {
          token: this.token
        }
      }
  );
  }



}
