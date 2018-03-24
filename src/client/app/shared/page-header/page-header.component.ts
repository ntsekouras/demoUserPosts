import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
    //to be enriched in the future (ex. textRight should be anything like another component
    @Input() title: string;
    @Input() extraContClasses: string;
    @Input() textRight: string;

    version: string = "1.0.0";

    constructor() {  }
}