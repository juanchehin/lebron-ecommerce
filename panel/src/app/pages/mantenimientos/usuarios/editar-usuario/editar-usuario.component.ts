import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styles: []
})
export class EditarUsuarioComponent implements OnInit {

  IdUsuario: any;

  Apellidos: any;
  Nombres: any;
  Usuario: any;
  DNI: any;
  Email: any;
  FechaNac: any;
  IdSucursal: any;
  Telefono: any;
  Observaciones: any;
  Password: any;
  Password2: any;
  
  permisos: Array<any> = new Array();
  permisosUsuario: Array<any> = new Array();
  sucursales: any;

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

  banderaCheckInversores = false;
  listarInversores   = false;
  altaInversores     = false;
  importarInversores = false;
  editarInversores   = false;
  borrarInversores   = false;

  banderaCheckCuentas = false;
  listarCuentas   = false;
  altaCuentas     = false;
  importarCuentas = false;
  editarCuentas   = false;
  borrarCuentas   = false;

  banderaCheckDolares = false;
  listarDolares   = false;
  altaDolares     = false;
  importarDolares = false;
  editarDolares   = false;
  borrarDolares   = false;

  banderaCheckQuimicos = false;
  listarQuimicos   = false;
  altaQuimicos     = false;
  importarQuimicos = false;
  editarQuimicos   = false;
  borrarQuimicos   = false;

  banderaCheckBackups = false;
  listarBackups   = false;
  altaBackups     = false;
  importarBackups = false;
  editarBackups   = false;
  borrarBackups   = false;

  banderaCheckConfiguraciones = false;
  listarConfiguraciones = false;
  editarConfiguraciones = false;

  constructor(
    private router: Router, 
    public usuariosService: UsuariosService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdUsuario = this.activatedRoute.snapshot.paramMap.get('IdUsuario');
    this.cargarDatosFormEditarUsuario();
  }

// ==================================================
//        Crear 
// ==================================================

editarUsuario() {

  const usuarioEditado = new Array(
    this.Apellidos,
    this.Nombres,
    this.Usuario,
    this.Email,
    this.Telefono,
    this.DNI,
    this.Password,
    this.Observaciones,
    this.FechaNac,
    this.IdSucursal,
    this.permisos
  );

  this.usuariosService.editarUsuario(this.IdUsuario, usuarioEditado )
            .subscribe( {
              next: (resp: any) => {
              
                if ( (resp != null) && (resp.mensaje == 'Ok') ) {
                  this.alertService.alertSuccess('top-end','Usuario actualizado',false,2000);
                  this.router.navigate(['/dashboard/usuarios']);
                } else {
                  this.alertService.alertFail('Ocurrio un error. ' + resp,false,2000);
                }
                return;
               },
              error: () => { this.alertService.alertFailWithText('Ocurrio un error', 'Contactese con el administrador',false,2000) }
            });

        };

// ==================================================
// Carga
// ==================================================

cargarDatosFormEditarUsuario() {

  this.usuariosService.cargarDatosFormEditarUsuario( this.IdUsuario  )
             .subscribe( {
              next: (resp: any) => {

                if ( (resp != null) && (resp[3][0].mensaje == 'Ok') ) {

                  this.Apellidos = resp[0][0].apellidos;
                  this.Nombres = resp[0][0].nombres;
                  this.Usuario = resp[0][0].usuario;
                  this.DNI = resp[0][0].dni;
                  this.Email = resp[0][0].email;
                  this.FechaNac = resp[0][0].fecha_nac;
                  this.IdSucursal = resp[0][0].id_sucursal;
                  this.Telefono = resp[0][0].telefono;
                  this.Observaciones = resp[0][0].observaciones;

                  this.permisosUsuario = resp[1];

                  this.sucursales = resp[2];

                  this.permisosUsuario.forEach( (value) => {
                    
                    this.permisos.push(value.id_permiso);
                    this.habilitarBanderas(value.id_permiso);
                  });

                } else {
                  this.alertService.alertFail('Ocurrio un error. ' + resp,false,2000);
                }
                return;
            },
            error: () => { this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000) }
          });

      };

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
//      Cuentas
// ==================================================

checkTodosCuentas()
{
  if(!this.banderaCheckCuentas){
    
    this.banderaCheckCuentas = true;


  this.listarCuentas = true;
  this.altaCuentas = true;
  this.importarCuentas = true;
  this.editarCuentas = true;
  this.borrarCuentas = true;

  // Agregar todos al array
  this.permisos.push(63,64,65,66);
}else
{
  this.banderaCheckCuentas = false;

  this.listarCuentas = false;
  this.altaCuentas = false;
  this.importarCuentas = false;
  this.editarCuentas = false;
  this.borrarCuentas = false;

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
//      Inversores
// ==================================================

checkTodosInversores()
{
  if(!this.banderaCheckInversores){
    
    this.banderaCheckInversores = true;


  this.listarInversores = true;
  this.altaInversores = true;
  this.importarInversores = true;
  this.editarInversores = true;
  this.borrarInversores = true;

  // Agregar todos al array
  this.permisos.push(67,68,69,70);
}else
{
  this.banderaCheckInversores = false;

  this.listarInversores = false;
  this.altaInversores = false;
  this.importarInversores = false;
  this.editarInversores = false;
  this.borrarInversores = false;

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
//      Dolares
// ==================================================

checkTodosDolares()
{
  if(!this.banderaCheckDolares){
    
    this.banderaCheckDolares = true;


  this.listarDolares = true;
  this.altaDolares = true;
  this.importarDolares = true;
  this.editarDolares = true;
  this.borrarDolares = true;

  // Agregar todos al array
  this.permisos.push(71,72,73,74);
}else
{
  this.banderaCheckDolares = false;

  this.listarDolares = false;
  this.altaDolares = false;
  this.importarDolares = false;
  this.editarDolares = false;
  this.borrarDolares = false;

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
//      Backups
// ==================================================

checkTodosBackups()
{
  if(!this.banderaCheckBackups){
    
    this.banderaCheckBackups = true;


  this.listarBackups = true;
  this.altaBackups = true;
  this.importarBackups = true;
  this.editarBackups = true;
  this.borrarBackups = true;

  // Agregar todos al array
  this.permisos.push(79,80,81,82);
}else
{
  this.banderaCheckBackups = false;

  this.listarBackups = false;
  this.altaBackups = false;
  this.importarBackups = false;
  this.editarBackups = false;
  this.borrarBackups = false;

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

}


// ===============================================
habilitarBanderas(itemIdPermisos: any){

  switch (itemIdPermisos) {
    // Productos
    case 1:
        this.listarProductos = true;
        break;
    case 2:
        this.altaProductos = true;
        break;
    case 3:
        this.editarProductos = true;
        break;
    case 4:
        this.borrarProductos = true;
        break;
    // Clientes
    case 5:
        this.listarClientes = true;
        break;
    case 6:
        this.altaClientes = true;
        break;
    case 7:
        this.editarClientes = true;
        break;
    case 8:
        this.borrarClientes = true;
        break;
    // Proveedores
    case 9:
        this.listarProveedores = true;
        break;
    case 10:
        this.altaProveedores = true;
        break;
    case 11:
        this.editarProveedores = true;
        break;
    case 12:
        this.borrarProveedores = true;
        break;
    // Sucursales
    case 13:
        this.listarSucursales = true;
        break;
    case 14:
        this.altaSucursales = true;
        break;
    case 15:
        this.editarSucursales = true;
        break;
    case 16:
        this.borrarSucursales = true;
        break;
    // Empleados
    case 17:
        this.listarEmpleados = true;
        break;
    case 18:
        this.altaEmpleados = true;
        break;
    case 19:
        this.editarEmpleados = true;
        break;
    case 20:
        this.borrarEmpleados = true;
        break;
    // Configuraciones
    case 21:
        this.listarConfiguraciones = true;
        break;
    case 22:
        // this.altaConfiguraciones = true;
        break;
    case 23:
        this.editarConfiguraciones = true;
        break;
    case 24:
        // this.borrarConfiguraciones = true;
        break;
    // Backups
    case 25:
        // this.listarBackups = true;
        break;
    case 26:
        // this.altaBackups = true;
        break;
    case 27:
        // this.editarBackups = true;
        break;
    case 28:
        // this.borrarBackups = true;
        break;
    // Pedidos
    case 29:
          this.listarPedidos = true;
          break;
    case 30:
          this.altaPedidos = true;
          break;
    case 31:
          this.editarPedidos = true;
          break;
    case 32:
          this.borrarPedidos = true;
          break;
    // Categorias
    case 33:
          this.listarCategorias = true;
          break;
    case 34:
          this.altaCategorias = true;
          break;
    case 35:
          this.editarCategorias = true;
          break;
    case 36:
          this.borrarCategorias = true;
          break;
    // Usuarios
    case 33:
          // this.listarUsuarios = true;
          break;
    case 34:
          // this.altaUsuarios = true;
          break;
    case 35:
          // this.editarUsuarios = true;
          break;
    case 36:
          // this.borrarUsuarios = true;
          break;
    // Compras
    case 41:
          // this.listarCompras = true;
          break;
    case 42:
          // this.altaCompras = true;
          break;
    case 43:
          // this.editarCompras = true;
          break;
    case 44:
          // this.borrarCompras = true;
          break;
    // Ventas
    case 45:
          this.listarVentas = true;
          break;
    case 46:
          this.altaVentas = true;
          break;
    case 47:
          this.editarVentas = true;
          break;
    case 48:
          this.borrarVentas = true;
          break;
    // Transferencias
    case 49:
          // this.listarTransferencias = true;
          break;
    case 50:
          // this.altaTransferencias = true;
          break;
    case 51:
          // this.editarTransferencias = true;
          break;
    case 52:
          // this.borrarTransferencias = true;
          break;
  // Informes
    case 53:
      // this.listarTransferencias = true;
      break;
    case 54:
      // this.altaTransferencias = true;
      break;
    case 55:
      // this.editarTransferencias = true;
      break;
    case 56:
      // this.borrarTransferencias = true;
      break;
    // Promociones
    case 57:
      this.listarPromociones = true;
      break;
    case 58:
      this.altaPromociones = true;
      break;
    case 59:
      this.editarPromociones = true;
      break;
    case 60:
      this.borrarPromociones = true;
      break;
    // Todos los permisos (admin)
    case 61:
        this.checkTodosProductos();
        this.checkTodosCategorias();
        this.checkTodosClientes();
        this.checkTodosEmpleados();
        this.checkTodosPedidos();
        this.checkTodosPromociones();
        this.checkTodosSucursales();
        this.checkTodosVentas();
        this.checkTodosProveedores();
        this.checkTodosConfiguraciones();
        break;
    // Productos
    case 62:
      this.importarProductos = true;
      break;
    // ** Cuentas corrientes **
    case 63:
      this.listarCuentas = true;
      break;
    case 64:
      this.altaCuentas = true;
      break;
    case 65:
      this.editarCuentas = true;
    break;
    case 66:
      this.borrarCuentas = true;
    break;
     // *** Quimicos ***
     case 75:
      this.listarQuimicos = true;
      break;
    case 76:
      this.altaQuimicos = true;
      break;
    case 77:
      this.editarQuimicos = true;
      break;
    case 78:
      this.borrarQuimicos = true;
    break;
     // *** Backups ***
     case 79:
      this.listarBackups = true;
      break;
    case 80:
      this.altaBackups = true;
      break;
    case 81:
      this.editarBackups = true;
      break;
    case 82:
      this.borrarBackups = true;
    break;
    default:
        break;
}

}
}