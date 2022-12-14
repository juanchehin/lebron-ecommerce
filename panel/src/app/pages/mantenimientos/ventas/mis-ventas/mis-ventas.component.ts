import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';
import { AlertService } from 'src/app/services/alert.service';

// para generar pdfs lado cliente
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
  totalVentas = '-';

  constructor(
    public proveedoresService: ProveedoresService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public ventasService: VentasService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.fecha = new Date();
    const previous = new Date(this.fecha.getTime());
    previous.setDate(this.fecha.getDate() - 1);
    this.fecha = this.formatDate(previous);
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

  const pFecha = this.formatDate(this.fecha);

    this.ventasService.listarVentasIdUsuario(this.desde, pFecha  )
    .subscribe({
      next: (resp: any) => { 

        if(resp[1][0].Mensaje == 'Ok') {
          this.ventas = resp[0];
          
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

  if ( desde >= this.totalProveedores ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  // this.cargarProductos();

}

// ==================================================
//    Formatea la fecha a yyyy-mm-dd
// ==================================================

formatDate(date: any) {

  // tslint:disable-next-line: one-variable-per-declaration
  let d = new Date(date),month = '' + (d.getMonth() + 1),day = '' + (d.getDate() + 1),
  // tslint:disable-next-line: prefer-const
  year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }

  return [year, month, day].join('-');
}

// ==================================================
// 
// ==================================================

generarPDF( pIdTransaccion: any) { 

  var dd = {
    content: [
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: [210, 70, 210],
          // dontBreakRows: true,
          // keepWithHeaderRows: 1,
          body: [
                  // Fila 1
                [
                    // Columna 1
                    [
                        {text: 'LeBron Suplementos\n\n', style: 'tableHeader', fontSize: 15},
                        {text: 'Belgrano 354.Lules (4128) - Tucuman\n', fontSize: 10,margin: [10, 10]},
                        {text: 'RESPONSABLE MONOTRIBUTO\n', fontSize: 9,bold: true,margin: [18, 10]},
                        {text: 'Sucursal Buenos Aires 42', fontSize: 9,bold: true,margin: [20, 10]}
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
                        {text: 'Nro: 00000088274', style: 'tableHeader', fontSize: 13,margin: [20, 5]},
                        {text: 'Fecha : 13/12/2022', fontSize: 9,margin: [20, 5]},
                        {text: 'CUIT : 20388073558', fontSize: 9,margin: [20, 5]},
                        {text: 'Ing. brutos', fontSize: 9,margin: [20, 5]},
                        {text: 'Inicio de Act.: 01-04-2016', fontSize: 9,margin: [20, 5]}
                    ]
                ],
                // Fila 2
                [
                    {
                    colSpan: 3,
                    text: 'Nombre:  GUADALUPE ABELLA (DNI 25498628) \n\nDirección: -'
                  },
                  '',
                  ''
                ],
                // Fila 3
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
                      text: [	'DNI/CUIT: 25498628']
                  }
            ],
                // Fila 4
                [
                      {
                          colSpan: 2,
                          text: 'Cond. de Venta | TARJETA $ 1900'
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
          body: [
            [
                {
                fillColor: '#eeeeff',
                text: 'CANT.',
                bold: true
              },
              {
                fillColor: '#eeeeff',
                text: 'DETALLE',
                bold: true
              },
              {
                fillColor: '#eeeeff',
                text: 'P. UNIT ',
                bold: true
              },
                {
                fillColor: '#eeeeff',
                text: 'SUBTOTAL',
                bold: true
              },
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],[
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            [
                '1',
                {text: 'PROTEIN BAR - BANANA'},
                {text: '250'},
                {text: '250'}
            ],
            ['', '' ,'TOTAL', '1900,00'],
          
          ]
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
    },
    defaultStyle: {
      // alignment: 'justify'
    }
    
  };

  pdfMake.createPdf(dd).open();

    // this.ventasService.dameDatosPDFVenta( pIdTransaccion  )
    // .subscribe({
    //   next: (resp: any) => { 

    //     console.log("resp es : ",resp)

    //     if(resp[1][0].Mensaje == 'Ok') {

    //       let doc = new jsPDF();
    //       doc.text("Hello world!", 10, 10);
    //       doc.save("a4.pdf");
    //       // doc.addHTML(this.content.nativeElement, function() {
    //       //    doc.save("obrz.pdf");
    //       // });
          
    //     } else {
    //       this.alertService.alertFail('Ocurrio un error',false,400);
          
    //     }
    //    },
    //   error: (err: any) => {
    //     this.alertService.alertFail('Ocurrio un error',false,400); }
    // });

  }


}
