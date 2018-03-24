import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EntityService } from './services/entity.service';
import { HelperService } from '../core/services/helper.service';
import { ExceptionService } from './services/exception.service';
import { CookieService } from './services/cookie.service';
import { MessageService } from './services/message.service';
import { HttpWrapperClientService } from "../core/services/http-wrapper-client.service";

//controls todo na ginei ena controls module
//import { TagsModule } from './controls/tags/tags.module';
//import { ExportButtonModule } from './controls/export-button/export-button.module';

//component
import { BaseComponent } from "./components/base.component";

//alla
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SpinnerModule } from './spinner/spinner.module';
import { ToastModule } from './toast/toast.module';

// imports: imports the module's exports. which is usually declarables and providers
// in our case the spinner has no providers.
//
// exports: exports modules AND components/directives/pipes that other modules may want to use
@NgModule({
    imports: [CommonModule, FormsModule, RouterModule,  SpinnerModule, ToastModule ],
    exports: [CommonModule, FormsModule, RouterModule,  SpinnerModule, ToastModule ],
    providers: [EntityService, ExceptionService, MessageService, HelperService, HttpWrapperClientService, CookieService]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
