import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IMenuStructure } from './menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {

  correoActual: any;
  elementosMenuPadre: any[] = [];
  // menu: any;
  menu: IMenuStructure[] = [];
  ocultarSidebar: boolean | undefined;

  constructor(
    public authService: AuthService,
    public usuarioService: UsuariosService
    ) {

  }

  ngOnInit() {
    this.armarMenu();
    this.ocultarSidebar = this.usuarioService.ocultarSidebar;
  }

  // Genera menu y submenu
  armarMenu(){
    this.elementosMenuPadre = this.authService.menuBack;
    // var elementosMenuPadre = this.local;
    // this.elementosMenuPadre = localStorage.getItem('menu');

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
}
