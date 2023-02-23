import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'lebron-panel';

  constructor(
    private router: Router,
    private alertService: AlertService
    ) {

    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            this.alertService.cargando = true;
        }

        if (event instanceof NavigationEnd) {
            this.alertService.cargando = false;
        }
    });

}
}
