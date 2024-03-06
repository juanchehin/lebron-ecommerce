import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class InversoresService {

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
//    Carga una nueva persona inverson  
// ==================================================
altaInversor( inversor: any ) {

  let url = URL_SERVICIOS + '/inversores/alta/' + this.IdPersona;

  return this.http.post(url,inversor, this.headers );
}
// ==================================================
//
// ==================================================
cargarInversores( parametroBusqueda: string){

    if(parametroBusqueda == '' || parametroBusqueda == null){
      let url = URL_SERVICIOS + '/inversores/listar/paginado/' + 0;
      return this.http.get( url );
    }
    else
    { 
      let url = URL_SERVICIOS + '/inversores/listar/busqueda/' + parametroBusqueda;
      return this.http.get( url );
    }
    
  }

// ==================================================
//
// ==================================================
buscarInversorPaginado(desde: any, pInversorBuscado: any){

  if(pInversorBuscado == '' || pInversorBuscado == null || pInversorBuscado == 'null' || !pInversorBuscado || pInversorBuscado.length === 0)
  {
    pInversorBuscado = '0';
  }

  let url = URL_SERVICIOS + '/inversores/listar/paginado/' + this.IdPersona + '/' + desde + '/' + pInversorBuscado;

  return this.http.get( url, this.headers );
}

// ==================================================
//        
// ==================================================
bajaInversor(IdInversor: any ) {

  let url = URL_SERVICIOS + '/inversores/baja/' + IdInversor + '/' + this.IdPersona;

  return this.http.get( url, this.headers);
}
  // ==================================================
//        
// ==================================================
editarInversor( inversorEditado: any ) {

  let url = URL_SERVICIOS + '/inversores/editar/' + this.IdPersona;

  return this.http.post( url, inversorEditado,this.headers);
}


// ==================================================
//        
// ==================================================
cargarDatosFormEditarInversor( IdInversor: any ) {

  let url = URL_SERVICIOS + '/inversores/editar/datos-formulario/' + IdInversor + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}

// ==================================================
//
// ==================================================
buscarHistoricoInversores(desde: number , FechaInicio: any , FechaFin: any){

  let url = URL_SERVICIOS + '/inversores/listar/paginado/' + this.IdPersona + '/' + desde + '/' + FechaInicio + '/' + FechaFin;

  return this.http.get( url, this.headers );
}

// ==================================================
//        
// ==================================================
altaMontoInversion( datosInversion: any, comprobante_inversion: File ) {

  const formData_inversion = new FormData();

  // Agregar datos del cliente al formulario
  formData_inversion.append('id_inversor', datosInversion[0]);
  formData_inversion.append('fecha_alta_inversion', datosInversion[1]);
  formData_inversion.append('monto_inversion', datosInversion[2]);
  formData_inversion.append('observaciones_alta_inversion', datosInversion[3]);
  formData_inversion.append('moneda_inversion', datosInversion[4]);
  formData_inversion.append('tasa_inversion', datosInversion[5]);

  // Adjuntar el archivo PDF al formulario
  formData_inversion.append('comprobante_inversion', comprobante_inversion);

  let url = URL_SERVICIOS + '/inversores/alta/monto/' + this.IdPersona;

  return this.http.post(url,formData_inversion, this.headers );
}

// ==================================================
//        
// ==================================================
bajaMontoInversion( datosInversion: any ) {

  let url = URL_SERVICIOS + '/inversores/baja/monto/' + this.IdPersona;

  return this.http.post(url,datosInversion, this.headers );
}

// ==================================================
//
// ==================================================
listarHistoricoInversor(IdInversor: number,desde: number , FechaInicio: any , FechaFin: any){

  let url = URL_SERVICIOS + '/inversores/historico/inversor/' + IdInversor + '/' + this.IdPersona + '/' + desde + '/' + FechaInicio + '/' + FechaFin;

  return this.http.get( url, this.headers );
}
}
