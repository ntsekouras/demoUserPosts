import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';

import { CoreModule } from "../core/core.module";
import { TsekSharedModule } from '../shared/shared.module';

import { UsersService } from './shared/users.service';


/* Components */
import { UsersComponent } from "./users.component";
import { UserComponent } from "./user/user.component";
import { UsersListComponent } from "./user-list/user-list.component";


// async components must be named routes for WebpackAsyncRoute
export const routes = [
    { path: 'users', component: UsersListComponent },
    { path: 'user/:id', component: UserComponent },
];

@NgModule({
    // Components / Directives/ Pipes
    declarations: [ UsersComponent, UserComponent, UsersListComponent ],
    imports: [ TableModule, TsekSharedModule, CoreModule, RouterModule.forChild(routes) ],
    providers: [ UsersService ]
})

export class UsersModule {
    static routes = routes;
}