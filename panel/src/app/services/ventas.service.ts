import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class VentasService {

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
  listarVentasFecha(pIdSucursal: any,pIdTipoVenta: any,pIdTransaccion: any, FechaInicio: any , FechaFin: any,desde: number){

    let url = URL_SERVICIOS + '/ventas/listar/' + this.IdPersona + '/' + pIdSucursal + '/' + pIdTipoVenta + '/' + pIdTransaccion + '/' + FechaInicio + '/' + FechaFin + '/' + desde;

    return this.http.get( url, this.headers );
  }
// ==================================================
//
// ==================================================
  listar_ventas_quimicos_fechas(FechaInicio: any , FechaFin: any,desde: number,estado_venta: any){

    let url = URL_SERVICIOS + '/ventas/quimicos/listar/' + this.IdPersona + '/' + FechaInicio + '/' + FechaFin + '/' + desde + '/' + estado_venta;

    return this.http.get( url, this.headers );
  }
// ==================================================
//
// ==================================================
altaVenta( venta : any, comprobante_venta: File){

  const formData_venta = new FormData();

  // Agregar datos del cliente al formulario
  formData_venta.append('IdCliente', venta[0]);
  formData_venta.append('lineas_venta', JSON.stringify(venta[1]));
  formData_venta.append('lineas_tipos_pago', JSON.stringify(venta[2]));
  formData_venta.append('cantidad_lineas_venta', venta[3]);
  formData_venta.append('cantidad_lineas_tipo_pago', venta[4]);
  formData_venta.append('totalVenta', venta[5]);
  formData_venta.append('fecha_venta', venta[6]);
  formData_venta.append('id_sucursal_seleccionada', venta[7]);
  formData_venta.append('id_operacion_seleccionada', venta[8]);

  // Adjuntar el archivo PDF al formulario
  formData_venta.append('comprobante_venta', comprobante_venta);

  let url = URL_SERVICIOS + '/ventas/alta/' + this.IdPersona;

  return this.http.post( url, formData_venta,this.headers );
}

// ==================================================
//
// ==================================================
altaVentaQuimico( venta : any, comprobante_quimico: File){

  const formData_venta = new FormData();

  // Agregar datos del cliente al formulario
  formData_venta.append('IdCliente', venta[0]);
  formData_venta.append('lineas_tipos_pago', JSON.stringify(venta[1]));
  formData_venta.append('cantidad_lineas_tipo_pago', venta[2]);

  formData_venta.append('totalVenta', venta[3]);
  formData_venta.append('fecha_venta', venta[4]);
  formData_venta.append('id_operacion_seleccionada', venta[5]);
  formData_venta.append('nro_remito', venta[6]);
  formData_venta.append('estado_venta_quimico', venta[7]);
  formData_venta.append('observaciones_venta', venta[8]);

  // Adjuntar el archivo PDF al formulario
  formData_venta.append('comprobante_quimico', comprobante_quimico);

  let url = URL_SERVICIOS + '/ventas/quimicos/alta/' + this.IdPersona;

  return this.http.post( url, formData_venta,this.headers );
}
// ==================================================
//
// ==================================================
listarVentasIdUsuario(desde: number , Fecha: string ){

  let url = URL_SERVICIOS + '/ventas/listar/mis-ventas/' + desde + '/' + Fecha + '/' + this.IdPersona;

  return this.http.get( url );
}
// ==================================================
//
// ==================================================
cargarTiposPago(){

  let url = URL_SERVICIOS + '/ventas/listar/tipos-pago';

  return this.http.get( url );
}

// ==================================================
//
// ==================================================
dameDatosPDFVenta( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/ventas/datos-pdf/' + pIdTransaccion;

  return this.http.get( url ,this.headers);
}


// ==================================================
//
// ==================================================
datosDashboard( ){

  let url = URL_SERVICIOS + '/ventas/datos/dashboard/' + this.IdPersona;

  return this.http.get( url ,this.headers);
}

// ==================================================
//
// ==================================================
cargarDatosNuevaVenta(  ){

  let url = URL_SERVICIOS + '/ventas/nueva/datos/' + this.IdPersona;

  return this.http.get( url ,this.headers);
}

// ==================================================
//
// ==================================================
baja_transaccion( id_transaccion : any){

  let url = URL_SERVICIOS + '/ventas/baja/' + this.IdPersona + '/' + id_transaccion;

  return this.http.get( url ,this.headers);
}

}
