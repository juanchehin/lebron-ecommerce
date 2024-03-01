import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
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
    private ventasService: VentasService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }


  // ====================
  // 
  // =================
  cargarDatosDashboard(){
    
    this.ventasService.datosDashboard(  )
                .subscribe({
                  next: (resp: any) => { 

                    if ( resp[6][0].mensaje == 'ok') {
                      this.nombreEmpresa = resp[0][0].nombreEmpresa || 0;
                      this.valorVentasDiarias = resp[1][0].ventasDiaHoy || 0;
                      this.valorComprasDiarias = resp[2][0].comprasDiaHoy || 0;
                      this.valorComprasOnline = resp[3][0].ventasOnlineHoy || 0;
                      this.productosMasVendidosMes = resp[4];
                      this.pedidosConfirmadosHoy = resp[3][0].pedidosConfirmadosHoy || 0;
                      
                    } else {
                      this.nombreEmpresa = '';
                      this.valorVentasDiarias = 0;
                      this.valorComprasDiarias = 0;
                      this.valorComprasOnline = 0;
                      this.productosMasVendidosMes = 0;
                      this.pedidosConfirmadosHoy = 0;
                    }
                    return;
                   },
                  error: () => { 
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000) 
                  }
                });
               
  }

  
}
