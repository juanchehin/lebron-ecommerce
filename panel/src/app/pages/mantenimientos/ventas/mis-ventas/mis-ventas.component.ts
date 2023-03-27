import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';
import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from 'src/app/services/util.service';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-ventas',
  templateUrl: './mis-ventas.component.html',
  styles: []
})
export class MisVentasComponent implements OnInit {

  @ViewChild('content') content: ElementRef | undefined;

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  fecha: any;
  ventas!: any;
  cantPlanes = 0;
  IdPersona: any;
  controlFechas = false;
  totalProveedores = 0;
  cargando = true;
  totalVentas: any = '-';

  //Datos PDF
  datosEncabezado: any;
  datosCliente: any;
  datosVendedor: any;
  datosTransaccion: any;
  datosLineasventa: any;


  constructor(
    public proveedoresService: ProveedoresService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public ventasService: VentasService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.utilService.formatDate(previous);
    this.cargarVentasIdUsuario();

    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');


    if(this.IdPersona || (this.IdPersona.length == 0))
    { 
      this.authService.quoteIdPersona.subscribe((data : any)=>{
        this.IdPersona = data;

        if(Object.keys(this.IdPersona).length <= 0)
        { 
          this.IdPersona = localStorage.getItem('id');
        }
      });
    }
  }

// ==================================================
// Carga
// ==================================================

cargarVentasIdUsuario() { 

  const pFecha = this.utilService.formatDate(this.fecha);

    this.ventasService.listarVentasIdUsuario(this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        console.log("resp cargarVentasIdUsuario : ",resp)

        if(resp[2][0].mensaje == 'Ok') {
          this.ventas = resp[0];
          this.totalVentas = resp[1][0].totalVentas;
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: (err: any) => { 
        this.alertService.alertFail('Ocurrio un error',false,400);
       }
    });

  }


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.desde = 0;
  this.cargarVentasIdUsuario();
}

// ==================================================
// Detecta los cambios en el select
// ==================================================
cambiosFecha(nuevaFechaInicio: any) {

  if (nuevaFechaInicio > this.fecha) {
    // this.FechaInicio = nuevaFechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

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
  this.cargarVentasIdUsuario();

}


// ==================================================
// 
// ==================================================

factura( pIdTransaccion: any) {  

    this.ventasService.dameDatosPDFVenta( pIdTransaccion  )
    .subscribe({
      next: (resp: any) => { 

        if((resp[5] != undefined) && (resp[5][0].mensaje == 'Ok')) {

          this.generarPDF(resp[0],resp[1],pIdTransaccion,resp[2],resp[3],resp[4]);
          
        } else {
          this.alertService.alertFail('Ocurrio un error',false,400);
          
        }
       },
      error: (err: any) => {
        this.alertService.alertFail('Ocurrio un error ' + err,false,400); }
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
    rows.push([item.Cantidad, item.Producto, item.precioVentaUnitario, item.SubTotal]);
  }

  for(var item of pCondVenta) {
    condVentaLinea += item.TipoPago + ' $ ' + item.Monto + ' | ';
  }

  rows.push(['', '', 'TOTAL', pDatosTransaccion[0].MontoTotal]);

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
                        {text: 'Sucursal : ' + pDatosTransaccion[0].Sucursal, fontSize: 9,bold: true,margin: [20, 10]}
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
                                          { text: 'C', style: 'tableHeader', fontSize: 30,border: [true, true, true, false] },
                                      ],
                                      [
                                          { text: 'COD 11', fontSize: 12,border: [true, false, true, true],margin: [8, 5] },
                                      ]
                                    ]
                                  },
                                }
                            ]
                          },
                    ],
                    // Columna 3
                    [
                        {text: 'FACTURA\n', style: 'tableHeader', fontSize: 15,margin: [20, 10]},
                        {text: 'Nro: 001-' + pIdTransaccion, style: 'tableHeader', fontSize: 13,margin: [20, 5]},
                        {text: 'Fecha : ' + pDatosTransaccion[0].fechaTransaccion, fontSize: 9,margin: [20, 5]},
                        {text: 'CUIT : ' + pDatosEncabezado[0].CUIT, fontSize: 9,margin: [20, 5]},
                        {text: 'Ing. brutos : ' + pDatosEncabezado[0].ing_brutos, fontSize: 9,margin: [20, 5]},
                        {text: 'Inicio de Act.: ' + pDatosEncabezado[0].inicio_actividad, fontSize: 9,margin: [20, 5]}
                    ]
                ],
                // Datos cliente
                [
                    {
                    colSpan: 3,
                    text: 'Nombre:  '+ pDatosCliente[0].apNomCliente  + ' (' + pDatosCliente[0].DNI  + ')  \n\nDirección: -'
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
                      text: [	'DNI/CUIT: ' + pDatosCliente[0].DNI ]
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
