import { Component, OnInit } from '@angular/core';
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
  expandirProductos = false;
  expandirVentas = false;

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
  }

  // ***
  activarMenu(itemMenu: string){
    const found = this.menu.find((obj) => {
      return obj.description === itemMenu;
    });

    if (found !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  // ******
  ocultarProductos()
  { 
    this.expandirProductos = !this.expandirProductos;
  }

  // ******
  ocultarVentas()
  { 
    this.expandirVentas = !this.expandirVentas;
  }

}
