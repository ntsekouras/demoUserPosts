import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "islast",
    template: "<span></span>"
})
export class LastDirective implements OnInit {
    @Input() isLast: boolean;
    @Output() onLastDone: EventEmitter<boolean> = new EventEmitter<boolean>();
    ngOnInit(): void {
        if (this.isLast) {
            this.onLastDone.emit(true);
        }
    }
}

// example html  ---  <islast [isLast]="last" (onLastDone)="modalMembersDone()"></islast>