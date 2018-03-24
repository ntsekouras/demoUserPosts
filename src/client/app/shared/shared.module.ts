import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { TooltipModule, EditorModule, SharedModule, DropdownModule, InputMaskModule, MultiSelectModule, DialogModule, ContextMenuModule } from 'primeng/primeng';

import { FilterTextModule } from './filter-text/filter-text.module';
//import { UploadModule } from './upload/upload.module';
import { PageHeaderModule } from './page-header/page-header.module';
import { SidebarModule } from './sidebar/sidebar.module';

//import { AutosizeDirective } from './autosize.directive';
//import { HtmlToPlaintextPipe } from './shared.pipes';
import { LastDirective } from './last.directive';

// imports: imports the module's exports. which are usually
// declarables(components / directives / pipes) and providers.
// in our case the FilterTextModule has a provider.
//
// exports: exports modules AND declarables (components/directives/pipes) that other modules may want to use
// SharedModule does not use CommonModule, but does use FormsModule.
// Even so, we import/export both of these because most other modules will import SharedModule and will need them.
@NgModule({
    imports: [CommonModule, FilterTextModule, FormsModule, PageHeaderModule, SidebarModule ],
    exports: [CommonModule, FilterTextModule, FormsModule, PageHeaderModule, SidebarModule, LastDirective],
    declarations: [LastDirective],
})
export class TsekSharedModule { }
