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
// El idpermiso tiene correspondencia con la BD (chequear BD - tabla 'permisos')
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

          console.log("resp es ;: ",resp)

          if(resp.Mensaje == 'Ok') {
            this.alertService.alertSuccess('top-end','Usuario creado con exito',false,900);   
            this.router.navigate(['/dashboard/usuarios']);
          } else {
            this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,700);            
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

    var idPermiso = 1;
    for(let i = 0; i < 4; i++)
    {
      const index = this.permisos.indexOf(idPermiso, 0);
      if (index > -1) {
        this.permisos.splice(index, 1);
      }
      idPermiso++;
    }

    const index = this.permisos.indexOf(62, 0);
      if (index > -1) {
        this.permisos.splice(index, 1);
      }
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

  // Agregar todos al array
  this.permisos.push(5,6,7,8);
}else
{ 
  this.banderaCheckClientes = false;

  this.listarClientes   = false;
  this.altaClientes     = false;
  this.importarClientes = false;
  this.editarClientes   = false;
  this.borrarClientes   = false;

  var idPermiso = 5;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
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

  // Agregar todos al array
  this.permisos.push(9,10,11,12);
}else
{
  this.banderaCheckProveedores = false;

  this.listarProveedores = false;
  this.altaProveedores = false;
  this.importarProveedores = false;
  this.editarProveedores = false;
  this.borrarProveedores = false;

  var idPermiso = 9;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
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
  
  // Agregar todos al array
  this.permisos.push(13,14,15,16);
}else
{
  this.banderaCheckSucursales = false;

  this.listarSucursales = false;
  this.altaSucursales = false;
  this.importarSucursales = false;
  this.editarSucursales = false;
  this.borrarSucursales = false; 

  var idPermiso = 13;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
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

  // Agregar todos al array
  this.permisos.push(17,18,19,20);
}else
{
  this.banderaCheckEmpleados = false;

  this.listarEmpleados = false;
  this.altaEmpleados = false;
  this.importarEmpleados = false;
  this.editarEmpleados = false;
  this.borrarEmpleados = false;

  var idPermiso = 17;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
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

  // Agregar todos al array
  this.permisos.push(21,23);
}else
{
  this.banderaCheckConfiguraciones = false;

  this.listarConfiguraciones = false;
  this.editarConfiguraciones = false;

    const index = this.permisos.indexOf(21, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }

    const index1 = this.permisos.indexOf(23, 0);
    if (index1 > -1) {
      this.permisos.splice(index1, 1);
    }
  

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

  // Agregar todos al array
  this.permisos.push(29,30,31,32);
}else
{
  this.banderaCheckPedidos = false;

  this.listarPedidos = false;
  this.altaPedidos = false;
  this.importarPedidos = false;
  this.editarPedidos = false;
  this.borrarPedidos = false;

  var idPermiso = 29;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
}
}

// ==================================================
//      Categorias
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

  // Agregar todos al array
  this.permisos.push(33,34,35,36);
}else
{
  this.banderaCheckCategorias = false;

  this.listarCategorias = false;
  this.altaCategorias = false;
  this.importarCategorias = false;
  this.editarCategorias = false;
  this.borrarCategorias = false;

  var idPermiso = 33;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
}
}

// ==================================================
//      Promociones
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

  // Agregar todos al array
  this.permisos.push(57,58,59,60);
}else
{
  this.banderaCheckPromociones = false;

  this.listarPromociones = false;
  this.altaPromociones = false;
  this.importarPromociones = false;
  this.editarPromociones = false;
  this.borrarPromociones = false;

  var idPermiso = 57;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
}
}

// ==================================================
//      Ventas
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

  // Agregar todos al array
  this.permisos.push(45,46,47,48);
}else
{
  this.banderaCheckVentas = false;

  this.listarVentas = false;
  this.altaVentas = false;
  this.importarVentas = false;
  this.editarVentas = false;
  this.borrarVentas = false;

  var idPermiso = 45;
  for(let i = 0; i < 4; i++)
  {
    const index = this.permisos.indexOf(idPermiso, 0);
    if (index > -1) {
      this.permisos.splice(index, 1);
    }
    idPermiso++;
  }
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
