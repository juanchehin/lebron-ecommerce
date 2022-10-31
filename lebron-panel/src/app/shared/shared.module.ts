import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        // NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        // FooterComponent
    ],
    exports: [
        // NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        // FooterComponent
    ]
})

export class SharedModule { }
