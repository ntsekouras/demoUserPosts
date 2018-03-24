import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

/* Our App Required Stuff */
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { PageHeaderModule } from './shared/page-header/page-header.module';

import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    SidebarModule,
    PageHeaderModule,
    UsersModule,
    DashboardModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent, PageNotFoundComponent ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }