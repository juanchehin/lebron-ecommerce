import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  correoActual: any;
  cargando = true;
  id!: number;

  constructor( ) {

    }

  ngOnInit() {


  }


}
