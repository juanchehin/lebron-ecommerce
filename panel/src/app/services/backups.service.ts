import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class BackupsService {

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
listarBackupsPaginado(desde: any,fecha: any){
  
  let url = URL_SERVICIOS + '/backups/listar/' + desde + '/' + fecha;

  return this.http.get( url );
}

// ==================================================
//   Realiza backup
// ==================================================

altaBackup() {
  let url = URL_SERVICIOS + '/backups/alta';
  return this.http.get( url );
}


// ==================================================
//   Realiza sincronizacion con drive
// ==================================================

sinc(name: string,id: string) {

  let url = URL_SERVICIOS + '/backups/drive/' + name + '/' + id;

  return this.http.get( url );

}


}
