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
cargar_detalle_compra(id_transaccion: any){

  let url = URL_SERVICIOS + '/compras/listar/detalle/' + id_transaccion + '/' + this.IdPersona;

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
altaGasto( gasto : any, comprobante_gasto: File){

  const formData_gasto = new FormData();

  // Agregar datos del cliente al formulario
  formData_gasto.append('monto_nuevo_gasto', gasto[1]);
  formData_gasto.append('tipo_pago_nuevo_gasto', gasto[2]);
  formData_gasto.append('fecha_gasto', gasto[3]);
  formData_gasto.append('descripcion_nuevo_gasto', gasto[4]);
  formData_gasto.append('id_sucursal_seleccionada_alta_gasto', gasto[5]);

  // Adjuntar el archivo PDF al formulario
  formData_gasto.append('comprobante_gasto', comprobante_gasto);

  let url = URL_SERVICIOS + '/compras/gastos/alta/' + this.IdPersona;

  return this.http.post( url, gasto,this.headers );
}

// ==================================================
//
// ==================================================
listarGastosPaginado(desde: number , fecha_inicio: string, fecha_fin: string, id_sucursal_seleccionada_listado: number ){

  let url = URL_SERVICIOS + '/compras/gastos/listar/' + desde + '/' + fecha_inicio + '/' + fecha_fin + '/' + id_sucursal_seleccionada_listado + '/' + this.IdPersona;

  return this.http.get( url,this.headers );
}

}
