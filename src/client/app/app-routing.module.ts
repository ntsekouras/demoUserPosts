import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './core';

import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found.component';


const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
    //imports: [RouterModule.forRoot(routes, {  })],
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: [
        CanDeactivateGuard
    ]
})
export class AppRoutingModule { }