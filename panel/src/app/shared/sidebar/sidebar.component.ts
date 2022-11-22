import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario.model';
import { IMenuStructure } from 'src/app/interfaces/menu.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  correoActual: any;
  elementosMenuPadre: any[] = [];
  // menu: any;
  menu: IMenuStructure[] = [];
  ocultarSidebar: boolean | undefined;
  expandirProductos = true;
  expandirVentas = true;
  expandirCompras = true;
  expandirTransferencias = true;

 
  constructor( public sidebarService: SidebarService,
                public authService: AuthService,
               private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.armarMenu();
  }

  // Genera menu y submenu
  armarMenu(){
    this.elementosMenuPadre = this.authService.menuBack;

    var pivot = this.elementosMenuPadre[0].Permiso;
    var proximovalor = this.elementosMenuPadre[1].Permiso;
    var i = 0;
    var j = 0;
    var id = 0;

    this.menu.push(
      {
        id: id,
        isDropDownMenu: true,
        description: this.elementosMenuPadre[i].Permiso,
        dropDownTarget: this.elementosMenuPadre[i].Permiso,
        subMenuList: []
      }
    )

    // ==============================
    this.elementosMenuPadre.forEach( (value) => {

      if((pivot == proximovalor) && (this.elementosMenuPadre[i + j] != undefined)){
        this.menu[id].subMenuList.push(
          this.elementosMenuPadre[i + j].Tipo
        )
        j++;
      }
      else{
        i = i + j;
        j = 0;
        pivot = proximovalor;
        id = id + 1;

        this.menu.push(
          {
            id: id,
            isDropDownMenu: true,
            description: this.elementosMenuPadre[i].Permiso,
            dropDownTarget: this.elementosMenuPadre[i].Permiso,
            subMenuList: []
          }
        )
        j++;
      }

      if(this.elementosMenuPadre[i + j] != undefined)
      {
        proximovalor = this.elementosMenuPadre[i + j].Permiso;
      }

    });

    console.log("this.menu es : ",this.menu)
  }

  // ***
  activarMenu(itemMenu: string): boolean{
    const found = this.menu.find((obj) => {
      return obj.description === itemMenu;
    });

    if (found !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  // ***
  activarSubMenu(itemPadre: string,itemHijo: string): boolean{

    const found1 = this.menu.find((obj: any) => {

      var first = obj.subMenuList.find((obj1: any) => {
        return obj1 === itemHijo;
      });
      console.log("first es ; ",first);

      return (obj.id === 0 && obj.subMenuList === itemHijo);
    });

    if (found1 !== undefined) {
      return true;
    } else {
      return false;
    }

  };

  expandirProductosFuncion(){
    this.expandirProductos = !this.expandirProductos;       
  }

  expandirVentasFuncion(){
    this.expandirVentas = !this.expandirVentas;       
  }

  expandirComprasFuncion(){
    this.expandirCompras = !this.expandirCompras;       
  }
  
  expandirTransferenciasFuncion(){
    this.expandirTransferencias = !this.expandirTransferencias;       
  }


}
