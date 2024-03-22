import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: []
})
export class VentasComponent implements OnInit {

  desde = 0;
  cargando = false;
  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));
  id_sucursal_seleccionada = 0;
  id_operacion_seleccionada = 0;
  id_transaccion_buscada = 0;

  //
  controlFechas = false;
  totalVentas = 0;
  ventas!: Array < any > ;
  operaciones: any;
  sucursales_usuario: any;

  constructor(
    public ventasService: VentasService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.cargarVentas();
  }


// ==================================================
//        Carga 
// ==================================================

cargarVentas() {

  //
  if(this.id_transaccion_buscada < 0)
  {
    this.alertService.alertFail('Transaccion invalida',false,2000);
    return;
  }

  //
  if(this.id_operacion_seleccionada < 0)
  {
    this.alertService.alertFail('Operacion invalida',false,2000);
    return;
  }


  this.ventasService.listarVentasFecha( this.id_sucursal_seleccionada, this.id_operacion_seleccionada, this.id_transaccion_buscada,this.fechaInicio, this.fechaFin , this.desde )
             .subscribe( {
              next: (resp: any) => {

                if(resp[4][0].mensaje == 'ok') {

                  this.totalVentas = resp[1][0].totalVentas;

                  this.ventas = resp[0];
                  this.sucursales_usuario = resp[2];
                  this.operaciones = resp[3];
                  
                  
                } else {
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
                }
              
                return;
               },
              error: () => { 
                this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000)
              }
            });

}

// ==================================================
//    
// ==================================================
onChangeSucursal(val: any){
  this.id_sucursal_seleccionada = val;
}

onChangeOperacion(val: any){
  this.id_operacion_seleccionada = val;
}


// ==================================================
//    
// ==================================================

baja_transaccion(id_transaccion: any) {

  
  Swal.fire({
    title: '¿Desea eliminar la transaccion?',
    text: "Eliminacion de transaccion",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.ventasService.baja_transaccion( id_transaccion )
      .subscribe({
        next: (resp: any) => {
  
          if(resp[0][0].mensaje == 'ok') {
            this.alertService.alertSuccess('top-end','Transaccion dado de baja',false,900);
            this.refrescar();
            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
         },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
    }
  })

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero

  this.id_sucursal_seleccionada = 0;
  this.id_operacion_seleccionada = 0;
  this.id_transaccion_buscada = 0;

  this.fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  this.fechaFin = this.utilService.formatDateNow(new Date(Date.now()));

  if(this.fechaInicio > this.fechaFin)
  {
    this.alertService.alertFail('Error de fechas',false,2000)
    return;
  }
  this.desde = 0;
  this.cargarVentas();
}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosfechaInicio(nuevafechaInicio: any) {

  if (nuevafechaInicio > this.fechaFin) {
    // this.fechaInicio = nuevafechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosfechaFin(nuevafechaFin: any) {

  if (nuevafechaFin < this.fechaInicio) {
    // this.fechaInicio = nuevafechaFin;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }
  // this.fechaFin = nuevafechaFin;

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalVentas ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarVentas();

}



// ==================================================
// 
// ==================================================

generar_factura_pdf( pIdTransaccion: any) {  

  this.ventasService.dameDatosPDFVenta( pIdTransaccion  )
  .subscribe({
    next: (resp: any) => {
      console.log('resp::: ', resp);

      if((resp[5] != undefined) && (resp[5][0].mensaje == 'Ok')) {

        this.generarPDF(resp[0],resp[1],pIdTransaccion,resp[2],resp[3],resp[4]);
        
      } else {
        this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',false,2000);
        
      }
     },
    error: (err: any) => {
      this.alertService.alertFail('Ocurrio un error ' + err,false,400); 
    }
  });

}
// ==================================================
// 
// ==================================================

generarPDF( pDatosEncabezado: any,pDatosCliente: any,pIdTransaccion: any,pDatosTransaccion: any,pDatosLineasVenta: any,pCondVenta: any) { 

var rows = [];
rows.push(['CANT.', 'DETALLE', 'P. UNIT.', 'SUBTOTAL']);
var condVentaLinea: any = '';


for(var item of pDatosLineasVenta) {
  rows.push([item.cantidad, item.producto, item.precio_ventaUnitario, item.SubTotal]);
}

for(var item of pCondVenta) {
  condVentaLinea += item.tipo_pago + ' $ ' + item.monto + ' | ';
}

rows.push(['', '', 'TOTAL', pDatosTransaccion[0].monto_total]);

  var dd = {
  content: [
    {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: [210, 70, 210],
        body: [
              // Encabezado
              [
                  // Columna 1
                  [
                      {text: 'LeBron Suplementos\n\n', style: 'tableHeader', fontSize: 15},
                      {text: 'Belgrano 354.Lules (4128) - Tucuman\n', fontSize: 10,margin: [10, 10]},
                      {text: 'RESPONSABLE MONOTRIBUTO\n', fontSize: 9,bold: true,margin: [18, 10]},
                      {text: 'Sucursal : ' + pDatosTransaccion[0].sucursal, fontSize: 9,bold: true,margin: [20, 10]}
                  ],
                  // Columna 2
                  [
                        {
                            colSpan: 2,
                          stack: [
                              {
                                table: {
                                    
                                  body: [
                                    [
                                        { text: 'X', style: 'tableHeader', fontSize: 30,border: [true, true, true, false] },
                                    ],
                                    [
                                        { text: 'COD X', fontSize: 12,border: [true, false, true, true],margin: [8, 5] },
                                    ]
                                  ]
                                },
                              }
                          ]
                        },
                  ],
                  // Columna 3
                  [
                      {text: pDatosTransaccion[0].operacion, style: 'tableHeader', fontSize: 15,margin: [20, 10]},
                      {text: 'Nro: 001-' + pIdTransaccion, style: 'tableHeader', fontSize: 13,margin: [20, 5]},
                      {text: 'Fecha : ' + pDatosTransaccion[0].fechaTransaccion, fontSize: 9,margin: [20, 5]},
                      {text: 'CUIT : ' + pDatosEncabezado[0].cuit, fontSize: 9,margin: [20, 5]},
                      {text: 'Ing. brutos : ' + pDatosEncabezado[0].ing_brutos, fontSize: 9,margin: [20, 5]},
                      {text: 'Inicio de Act.: ' + pDatosEncabezado[0].inicio_actividad, fontSize: 9,margin: [20, 5]}
                  ]
              ],
              // Datos cliente
              [
                  {
                  colSpan: 3,
                  text: 'Nombre:  '+ pDatosCliente[0].apNomCliente  + ' (' + pDatosCliente[0].dni  + ')  \n\nDirección: -'
                },
                '',
                ''
              ],
              // Datos transaccion
              [
                {
                    colSpan: 2,
                  stack: [
                    'I.V.A',
                      {
                        table: {
                          body: [
                            [ 'Efectivo:', '', 'Cta. Cte.', '', 'Transferencia', ''],
                            [ 'QR:', '','Credito','', '', ''],
                          ]
                        },
                      }
                  ]
                },
                [
                  ''
                ],
                {
                    text: [	'DNI/CUIT: ' + pDatosCliente[0].dni ]
                }
              ],
              // Cond venta
              [
                    {
                        colSpan: 2,
                        text: 'Cond. de Venta | $ ' + condVentaLinea
                    },
                    [
                      ''
                    ],
                    {
                        text: [	'Remito N°:']
                    }
              ],
            ],
          }
    },
    // Tabla cantidades detalle
      {
      style: 'tableExample',
      table: {
        widths: [50, '*', 50, 70],
        body: rows
      }
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black',
        margin: 20
    }
  }
};

pdfMake.createPdf(dd).download('registro-' + pDatosTransaccion[0].fechaTransaccion + '-' + pIdTransaccion + '.pdf');

}

}
