import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageHeaderComponent } from './page-header.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [PageHeaderComponent],
    declarations: [PageHeaderComponent]
})
export class PageHeaderModule { }