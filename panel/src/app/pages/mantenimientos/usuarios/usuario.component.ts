import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SucursalesService } from 'src/app/services/sucursal.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  forma!: FormGroup;
  cargando = true;
  idSucursalSeleccionado = 0;

  banderaCheckProductos = false;
  listarProductos = false;
  altaProductos = false;
  importarProductos = false;
  editarProductos = false;
  borrarProductos = false;

  banderaCheckClientes = false;
  listarClientes   = false;
  altaClientes     = false;
  importarClientes = false;
  editarClientes   = false;
  borrarClientes   = false;

  banderaCheckProveedores = false;
  listarProveedores   = false;
  altaProveedores     = false;
  importarProveedores = false;
  editarProveedores   = false;
  borrarProveedores   = false;

  banderaCheckSucursales = false;
  listarSucursales   = false;
  altaSucursales     = false;
  importarSucursales = false;
  editarSucursales   = false;
  borrarSucursales   = false;

  banderaCheckEmpleados = false;
  listarEmpleados   = false;
  altaEmpleados     = false;
  importarEmpleados = false;
  editarEmpleados   = false;
  borrarEmpleados   = false;

  banderaCheckPedidos = false;
  listarPedidos   = false;
  altaPedidos     = false;
  importarPedidos = false;
  editarPedidos   = false;
  borrarPedidos   = false;

  banderaCheckCategorias = false;
  listarCategorias   = false;
  altaCategorias     = false;
  importarCategorias = false;
  editarCategorias   = false;
  borrarCategorias   = false;

  banderaCheckPromociones = false;
  listarPromociones   = false;
  altaPromociones     = false;
  importarPromociones = false;
  editarPromociones   = false;
  borrarPromociones   = false;
  
  banderaCheckVentas = false;
  listarVentas   = false;
  altaVentas     = false;
  importarVentas = false;
  editarVentas   = false;
  borrarVentas   = false;

  banderaCheckConfiguraciones = false;
  listarConfiguraciones = false;
  editarConfiguraciones = false;

  permisos: Array<any> = new Array();
  sucursales: any;

  constructor(
    private router: Router, 
    public usuariosService: UsuariosService, 
    public activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private sucursalService: SucursalesService
    ) {
    

  }

  ngOnInit() {
    this.cargarSucursales();
    this.forma = new FormGroup({
        Apellidos: new FormControl(null, Validators.required),
        Nombres: new FormControl(null, Validators.required),
        Usuario: new FormControl(null, Validators.required),
        IdSucursal: new FormControl(null, Validators.required),
        Telefono: new FormControl(null ),
        Correo: new FormControl(null),
        DNI: new FormControl(null),
        Password: new FormControl(null, Validators.required ),
        Password2: new FormControl(null , Validators.required),
        Observaciones: new FormControl(null),
        FechaNac: new FormControl(null  )        
      });

  }

// ==================================================
//   Agrega un Permiso
// El idpermiso tiene correspondencia con la BD (chequear BD - tabla permisos)
// ==================================================
  agregarPermiso(idPermiso: any){

    if(!this.permisos.includes(idPermiso))
    {
      this.permisos.push(idPermiso);
    }
    else
    {
      const index = this.permisos.indexOf(idPermiso, 0);
      if (index > -1) {
        this.permisos.splice(index, 1);
      }
      // delete this.permisos[idPermiso];
    }

    console.log("permisos va quedando : " + this.permisos)
  }
// ==================================================
//   Agrega un Permiso
// El idpermiso tiene correspondencia con la BD (chequear BD - tabla permisos)
// ==================================================
  chequearPermiso(idPermiso: any){

    console.log("idPermiso : " + idPermiso)

    console.log("this.permisos : " + this.permisos)

    if(this.permisos.includes(idPermiso))
    {
      console.log("true")
      return false;
    }
    else
    {
      delete this.permisos[idPermiso];
      console.log("false ")
      return true;
    }

  }
// ==================================================
//        Crear 
// ==================================================

  altaUsuario() {

      if ( this.forma.invalid ) {
        return;
      }

      console.log("this.forma.value.IdSucursal ",this.forma.value.IdSucursal)
      if (this.forma.value.IdSucursal == 0) {
        this.alertService.alertFail('Debe seleccionar una sucursal',false,700); 
        return;
      }

      const usuario = new Array(
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.Usuario,
        this.forma.value.Correo,
        this.forma.value.Telefono,
        this.forma.value.DNI,
        this.forma.value.Password,
        this.forma.value.Observaciones,
        this.forma.value.FechaNac,
        this.forma.value.IdSucursal,
        this.permisos
      );

      this.usuariosService.altaUsuario( usuario )
      .subscribe({
        next: (resp: any) => { 


          if(resp.Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Usuario creado con exito',false,700);   
            this.router.navigate(['/dashboard/usuarios']);
          } else {
            this.alertService.alertFail('Ocurrio un error',false,700);            
          }
         },
        error: (err: any) => {
          this.alertService.alertFail('Ocurrio un error',false,700); }
      });


}

// ==================================================
//      
// ==================================================

checkTodosProductos()
{
  if(!this.banderaCheckProductos){
    
    this.banderaCheckProductos = true;

    this.listarProductos = true;
    this.altaProductos = true;
    this.importarProductos = true;
    this.editarProductos = true;
    this.borrarProductos = true;

    this.permisos.push(1,2,3,4,62);
  }else
  { 
    this.banderaCheckProductos = false;

    this.listarProductos = false;
    this.altaProductos = false;
    this.importarProductos = false;
    this.editarProductos = false;
    this.borrarProductos = false;
  }
 
}

// ==================================================
//      
// ==================================================

checkTodosClientes()
{
  if(!this.banderaCheckClientes){
    
    this.banderaCheckClientes = true;

  this.listarClientes   = true;
  this.altaClientes     = true;
  this.importarClientes = true;
  this.editarClientes   = true;
  this.borrarClientes   = true;
}else
{ 
  this.banderaCheckClientes = false;

  this.listarClientes   = false;
  this.altaClientes     = false;
  this.importarClientes = false;
  this.editarClientes   = false;
  this.borrarClientes   = false;
}
}

// ==================================================
//      
// ==================================================

checkTodosProveedores()
{
  if(!this.banderaCheckProveedores){
    
    this.banderaCheckProveedores = true;

  this.listarProveedores = true;
  this.altaProveedores = true;
  this.importarProveedores = true;
  this.editarProveedores = true;
  this.borrarProveedores = true;
}else
{
  this.banderaCheckProveedores = false;

  this.listarProveedores = false;
  this.altaProveedores = false;
  this.importarProveedores = false;
  this.editarProveedores = false;
  this.borrarProveedores = false;
}

}

// ==================================================
//      
// ==================================================

checkTodosSucursales()
{
  if(!this.banderaCheckSucursales){
    
    this.banderaCheckSucursales = true;

  this.listarSucursales = true;
  this.altaSucursales = true;
  this.importarSucursales = true;
  this.editarSucursales = true;
  this.borrarSucursales = true;
}else
{
  this.banderaCheckSucursales = false;

  this.listarSucursales = false;
  this.altaSucursales = false;
  this.importarSucursales = false;
  this.editarSucursales = false;
  this.borrarSucursales = false; 
}

}

// ==================================================
//      
// ==================================================

checkTodosEmpleados()
{
  if(!this.banderaCheckEmpleados){
    
    this.banderaCheckEmpleados = true;


  this.listarEmpleados = true;
  this.altaEmpleados = true;
  this.importarEmpleados = true;
  this.editarEmpleados = true;
  this.borrarEmpleados = true;
}else
{
  this.banderaCheckEmpleados = false;

  this.listarEmpleados = false;
  this.altaEmpleados = false;
  this.importarEmpleados = false;
  this.editarEmpleados = false;
  this.borrarEmpleados = false;
}
}

// ==================================================
//      
// ==================================================

checkTodosConfiguraciones()
{
  if(!this.banderaCheckConfiguraciones){
    
    this.banderaCheckConfiguraciones = true;

  this.listarConfiguraciones = true;
  this.editarConfiguraciones = true;
}else
{
  this.banderaCheckConfiguraciones = false;

  this.listarConfiguraciones = false;
  this.editarConfiguraciones = false;
}
}

// ==================================================
//      
// ==================================================

checkTodosPedidos()
{
  if(!this.banderaCheckPedidos){
    
    this.banderaCheckPedidos = true;


  this.listarPedidos = true;
  this.altaPedidos = true;
  this.importarPedidos = true;
  this.editarPedidos = true;
  this.borrarPedidos = true;
}else
{
  this.banderaCheckPedidos = false;

  this.listarPedidos = false;
  this.altaPedidos = false;
  this.importarPedidos = false;
  this.editarPedidos = false;
  this.borrarPedidos = false;
}
}

// ==================================================
//      
// ==================================================

checkTodosCategorias()
{
  if(!this.banderaCheckCategorias){
    
    this.banderaCheckCategorias = true;


  this.listarCategorias = true;
  this.altaCategorias = true;
  this.importarCategorias = true;
  this.editarCategorias = true;
  this.borrarCategorias = true;
}else
{
  this.banderaCheckCategorias = false;

  this.listarCategorias = false;
  this.altaCategorias = false;
  this.importarCategorias = false;
  this.editarCategorias = false;
  this.borrarCategorias = false;
}
}

// ==================================================
//      
// ==================================================

checkTodosPromociones()
{
  if(!this.banderaCheckPromociones){
    
    this.banderaCheckPromociones = true;


  this.listarPromociones = true;
  this.altaPromociones = true;
  this.importarPromociones = true;
  this.editarPromociones = true;
  this.borrarPromociones = true;
}else
{
  this.banderaCheckPromociones = false;

  this.listarPromociones = false;
  this.altaPromociones = false;
  this.importarPromociones = false;
  this.editarPromociones = false;
  this.borrarPromociones = false;
}
}

// ==================================================
//      
// ==================================================

checkTodosVentas()
{
  if(!this.banderaCheckVentas){
    
    this.banderaCheckVentas = true;


  this.listarVentas = true;
  this.altaVentas = true;
  this.importarVentas = true;
  this.editarVentas = true;
  this.borrarVentas = true;
}else
{
  this.banderaCheckVentas = false;

  this.listarVentas = false;
  this.altaVentas = false;
  this.importarVentas = false;
  this.editarVentas = false;
  this.borrarVentas = false;
}
}

// ==================================================
//      
// ==================================================

cargarSucursales()
{
  
  this.sucursalService.listarTodasSucursales(  )
    .subscribe({
      next: (resp: any) => { 

        if(resp[1][0].Mensaje == 'Ok') {
          this.sucursales = resp[0];
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: (err: any) => { 
        this.alertService.alertFail('Ocurrio un error',false,400);
       }
    });
}
}
