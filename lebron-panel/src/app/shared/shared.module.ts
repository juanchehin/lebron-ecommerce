import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        NopagefoundComponent,
        LoginComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    ],
    exports: [
        NopagefoundComponent,
        LoginComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    ]
})

export class SharedModule { }
