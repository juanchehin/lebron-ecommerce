import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { IMenuStructure } from 'src/app/interfaces/menu.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  correoActual: any;
  elementosMenuPadre: any[] = [];
  IdPersona: any;
  // menu: any;
  menu: IMenuStructure[] = [];
  ocultarSidebar: boolean | undefined;
  expandirProductos = true;
  expandirVentas = true;
  expandirCompras = true;
  expandirTransferencias = true;
  expandirClientes = true;


 
  constructor( 
              public sidebarService: SidebarService,
              public authService: AuthService
            ) {}

  ngOnInit(): void {
    this.armarMenu();
    this.IdPersona = this.authService.IdPersona;
  }

  // Genera menu y submenu
  armarMenu(){

    var long: any = localStorage.getItem('menu')?.length;

    if(long == undefined || long <= 0){
      this.authService.logout();
      return;
    }

    if(this.authService.menuBack.length <= 0)
    {
      this.elementosMenuPadre = JSON.parse(localStorage.getItem('menu')!);
    }
    else{
      this.elementosMenuPadre = this.authService.menuBack;
    }
    
    return;

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
  activarMenu(itemMenu: string): boolean{

    const found = this.elementosMenuPadre.find((obj) => {
      return obj.permiso === itemMenu;
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

  expandirClientesFuncion(){
    this.expandirClientes = !this.expandirClientes;       
  }


}
