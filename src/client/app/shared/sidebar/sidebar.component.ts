import { Component, Input } from '@angular/core';


//var v = Math.random() * Math.random();


@Component({
    selector: 'sidebar',
    templateUrl: `./sidebar.component.html?v=34`
})
export class SidebarComponent {
    @Input() menuItems: any;
    @Input() extraContClasses: string;

    constructor() {  }
}