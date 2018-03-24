import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


/// Components 
import { DashboardComponent } from "./dashboard.component";


// async components must be named routes for WebpackAsyncRoute
export const routes = [
    { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
    declarations: [ DashboardComponent ],
    imports: [ RouterModule.forChild(routes) ]
})

export class DashboardModule {
    static routes = routes;
}