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
  pedidosConfirmadosHoy: any;

  constructor(
    private ventasService: VentasService
  ) { }

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }


  // ====================
  // 
  // =================
  cargarDatosDashboard(){

    this.ventasService.datosDashboard(  )
               .subscribe( (resp: any) => {

                this.nombreEmpresa = resp[0][0].nombreEmpresa || 0;
                this.valorVentasDiarias = resp[1][0].ventasDiaHoy || 0;
                this.valorComprasDiarias = resp[2][0].comprasDiaHoy || 0;
                this.valorComprasOnline = resp[3][0].ventasOnlineHoy || 0;
                this.productosMasVendidosMes = resp[4];
                this.pedidosConfirmadosHoy = resp[3][0].pedidosConfirmadosHoy || 0;

              });


  }

  
}
