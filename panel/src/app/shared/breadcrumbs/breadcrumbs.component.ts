import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.css' ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: any;
  public tituloSubs$: Subscription;

  
  constructor( private router: Router, 
              public alertService: AlertService
              ) {

    this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe( ({ titulo }) => {
                            this.titulo = titulo;
                            document.title = `Lebron - ${ titulo }`;
                        });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentosRuta() {

    return this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }


}
