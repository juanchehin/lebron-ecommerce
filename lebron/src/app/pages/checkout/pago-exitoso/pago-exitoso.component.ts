import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styles: []
})
export class PagoExitosoComponent implements OnInit {
  collection_id: any;
  collection_status: any;
  payment_id: any;
  status: any;
  payment_type: any;
  merchant_order_id: any;
  preference_id: any;
  site_id: any;
  processing_mode: any;
  merchant_account_id: any;


  constructor(
    public activatedRoute: ActivatedRoute
    ) { 
      this.activatedRoute.queryParams.subscribe(params => {
        let status = params['status'];
        console.log("params : ",params);
        console.log("status 1 : ",status); // Print the parameter to the console. 
    });
    }
  ngOnInit() {
    // this.dameDatosProducto();
    this.collection_id = this.activatedRoute.snapshot.paramMap.get('collection_id');
    this.collection_status = this.activatedRoute.snapshot.paramMap.get('collection_status');
    this.payment_id = this.activatedRoute.snapshot.paramMap.get('payment_id');

    this.status = this.activatedRoute.snapshot.paramMap.get('status');
    this.payment_type = this.activatedRoute.snapshot.paramMap.get('payment_type');
    this.merchant_order_id = this.activatedRoute.snapshot.paramMap.get('merchant_order_id');

    this.preference_id = this.activatedRoute.snapshot.paramMap.get('preference_id');
    this.site_id = this.activatedRoute.snapshot.paramMap.get('site_id');
    this.processing_mode = this.activatedRoute.snapshot.paramMap.get('processing_mode');

    this.merchant_account_id = this.activatedRoute.snapshot.paramMap.get('merchant_account_id');

    console.log("status : ",this.status);
  }

}
