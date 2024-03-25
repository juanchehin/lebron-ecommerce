import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class DolaresService {

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
listarHistoricoDolares(filtroTipo: number, desde: number , FechaInicio: any , FechaFin: any){

  let url = URL_SERVICIOS + '/dolares/listar/' + this.IdPersona + '/' +  filtroTipo + '/' + desde + '/' + FechaInicio + '/' + FechaFin;

  return this.http.get( url, this.headers );
}

// ==================================================
//        
// ==================================================
alta_compra_dolar( array_compra_dolar: any, comprobante_alta_compra_dolar: any ) {

  const formData_compra_dolar = new FormData();

  formData_compra_dolar.append('monto_compra_dolar', array_compra_dolar[0]);
  formData_compra_dolar.append('fecha_compra_dolar', array_compra_dolar[1]);
  formData_compra_dolar.append('observaciones_compra_dolar', array_compra_dolar[2]);

  formData_compra_dolar.append('comprobante_alta_compra_dolar', comprobante_alta_compra_dolar);


  let url = URL_SERVICIOS + '/dolares/alta/compra/' + this.IdPersona;

  return this.http.post(url,formData_compra_dolar, this.headers );
}

// ==================================================
//        
// ==================================================
alta_venta_dolar( array_venta_dolar: any, comprobante_alta_venta_dolar: any ) {

  const formData_venta_dolar = new FormData();
  
  formData_venta_dolar.append('monto_venta_dolar', array_venta_dolar[0]);
  formData_venta_dolar.append('fecha_venta_dolar', array_venta_dolar[1]);
  formData_venta_dolar.append('observaciones_venta_dolar', array_venta_dolar[2]);
  
  formData_venta_dolar.append('comprobante_alta_venta_dolar', comprobante_alta_venta_dolar);
  
  let url = URL_SERVICIOS + '/dolares/alta/venta/' + this.IdPersona;

  return this.http.post( url, formData_venta_dolar,this.headers);
}

}
