import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  private linkTheme = document.querySelector('#theme');


  constructor(private http: HttpClient) { 
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);

  }

// ==================================================
//
// ==================================================
cargarConfiguraciones( ){

  let url = URL_SERVICIOS + '/settings/listar/empresa';

  return this.http.get( url);
    
  }
// ==================================================
//
// ==================================================
  actualizarConfiguracion( configuraciones: any){

    let url = URL_SERVICIOS + '/settings/actualizar';

  return this.http.put( url,configuraciones);
    
  }

  // ==================================================
//
// ==================================================
 changeTheme( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url );

    this.checkCurrentTheme();
  }

  // ==================================================
//
// ==================================================
  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if ( btnThemeUrl === currentTheme ) {
        elem.classList.add('working');
      }

    });

  }

}
