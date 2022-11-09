import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona!: any;
  personaValor!: any;
  personaId!: any;
  IdRol: any;
  token!: any;
  usuario: any;
  menuBack!: any;


  constructor(
    public http: HttpClient,
    public router: Router ) {
    this.cargarPersonas();
  }

// ====================================================================================================================
// =========================================== PERSONAS ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar persona - Peticion GET al server
// ==================================================
cargarPersonas( desde: number = 0 ) {

  const url = URL_SERVICIOS + '/personas?desde=' + desde;

  return this.http.get( url );

}


// ==================================================
// Devuelve los roles de la BD
// ==================================================

dameRoles( ) {

  let url = URL_SERVICIOS + '/personas/roles/listar';

  // return this.http.get(url,
  //     {
  //       headers: {
  //         token: this.token
  //       }
  //     }
  //   ).map( (resp: any) => resp[0]);
}
// ==================================================
//        Da de baja una persona
// ==================================================

bajaPersona( termino: string ) {

    let url = URL_SERVICIOS + '/personas/';
    url += '&termino=' + termino;
    url += '&IdRol=' + this.IdRol;

    // return this.http.put(url,
    //   termino,
    //   {
    //     headers: {
    //       token: this.token
    //     }
    //   }).map( (resp: any) => {
    //           Swal.fire({
    //             position: 'top-end',
    //             icon: 'success',
    //             title: 'Persona eliminada',
    //             showConfirmButton: false,
    //             timer: 2000
    //           });
    //         });
}

// ==================================================
//        Obtiene una persona de la BD
// ==================================================

damePersona( termino: string ): any {

  console.log("pasa damePersona");

  const url = URL_SERVICIOS + '/personas/' + termino;

  return this.http.get(url);

}


// ==================================================
//        Busca una persona por termino
// ==================================================

  buscarPersona( termino: string ) {

    const url = URL_SERVICIOS + '/personas/busqueda/' + termino;

    // return this.http.get(url)
    //         .map( (resp: any) => resp[0]);
  }

// ==================================================
//        Actualizar persona - VERIFICAR SU FUNCIONAMIENTO - 05/02/20
// ==================================================

  actualizarPersona( persona: any) {
    let url = URL_SERVICIOS + '/persona/' + this.persona.Correo;
    url += '?IdRol=' + this.IdRol;

    // return this.http.put(
    //   url,
    //   persona,
    //   {
    //     headers: {
    //       token: this.token
    //     }
    //   }
    //   ).map( (resp: any) => {
    //           const personaDB: Persona = resp.usuario;

    //           const param = String(personaDB.IdPersona);

    //           if ( persona.IdPersona === this.persona.IdPersona ) {

    //             this.guardarStorage( param , this.token , this.usuario , this.menu , this.IdRol);
    //           }

    //           this.guardarStorage( param , this.token , this.usuario , this.menu , this.IdRol);
    //           Swal.fire({
    //             position: 'top-end',
    //             icon: 'success',
    //             title: 'Usuario actualizado',
    //             showConfirmButton: false,
    //             timer: 2000
    //           });
    //         });
  }


// ====================================================================================================================
// =========================================== CLIENTES ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar clientes - Peticion GET al server
// ==================================================
cargarClientesPlanEstado( desde: number = 0 , IdPlan: any) {

  let url = URL_SERVICIOS + '/personas/clientes/plan/' + desde + '/' + IdPlan ;  // query
  url += '?IdRol=' + this.IdRol;

  return this.http.get(
    url, {
      headers: {
        token: this.token
      }
    }
);

}
// ==================================================
//  Activa un cliente (caso en que el cliente se dio de baja y desea reactivarse)
// ==================================================
activarCliente( IdPersona: any ) {

  let url = URL_SERVICIOS + '/personas/cliente/activar/' + IdPersona;
  url += '?IdRol=' + this.IdRol;

  return this.http.put(
    url,
    IdPersona,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
// Busca una persona en la BD dado su ID y el ID del plan al cual esta inscripto
// ==================================================

buscarClientePorPlan( Apellidos: string , Nombres: string , IdPlan: string  ): any {

  const url = URL_SERVICIOS + '/personas/busqueda/plan/' + Apellidos + '/' + Nombres  + '/' + IdPlan;

  return this.http.get(url);

//    return this.http.get(url)
//           .map( (resp: any) => resp[0]);
}

// ==================================================
//        Crear cliente
// ==================================================
crearCliente( cliente: any ) {

  console.log("clinetes es : ",cliente);

  let url = URL_SERVICIOS + '/personas/cliente';
  url += '?IdRol=' + this.IdRol;

  return this.http.post(
    url,
    cliente,
    {
      headers: {
        token: this.token
      }
    }
);
}

// ==================================================
//        Elimina un cliente
// ==================================================

eliminarCliente( IdPersona: any ) {

  let url = URL_SERVICIOS + '/personas/cliente/eliminar/' + IdPersona;

  // url += '?token=' + this.token;  // query
  url += '?IdRol=' + this.IdRol;

  return this.http.put(
    url,
    IdPersona,
    {
      headers: {
        token: this.token
      }
    }
);

  // return this.http.delete(url );
}

// ==================================================
//        Editar Cliente
// ==================================================

editarCliente( cliente: any ) {

  const id = cliente.IdPersona;

  let url = URL_SERVICIOS + '/personas/cliente/actualizar/' + id;

  // url += '?token=' + this.token;  // query
  url += '?IdRol=' + this.IdRol;


  return this.http.put(url ,
     cliente,
     {
      headers: {
        token: this.token
      }
    }
  );
}


}
