import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  nombreEmpresa: any;
  valorVentasDiarias: any;
  valorComprasDiarias: any;
  valorComprasOnline: any;
  productosMasVendidosMes: any;

  constructor(
    private ventasService: VentasService
  ) { }

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }


  // ====================
  // suma de ventas diarias, 
  // =================
  cargarDatosDashboard(){

    this.ventasService.datosDashboard(  )
               .subscribe( (resp: any) => {

                this.nombreEmpresa = resp[0][0].nombreEmpresa;
                this.valorVentasDiarias = resp[1][0].ventasDiaHoy;
                this.valorComprasDiarias = resp[2][0].comprasDiaHoy;
                this.valorComprasOnline = resp[3][0].ventasOnlineHoy;
                this.productosMasVendidosMes = resp[4];

              });


  }
}
