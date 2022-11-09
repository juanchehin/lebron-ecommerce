import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IMenuStructure } from './menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  correoActual: any;
  elementosMenuPadre: any[] = [];
  // menu: any;
  menu: IMenuStructure[] = [];

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    this.armarMenu();
  }

  // Genera menu y submenu
  armarMenu(){
    // var menuHijo;

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

    console.log("this.menu is : ", this.menu)
  }

}
