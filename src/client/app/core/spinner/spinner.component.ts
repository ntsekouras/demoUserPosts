import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ISpinnerState, SpinnerService } from './spinner.service';

@Component({
    selector: 'spinner',
    template: './spinner.component.html'
})
export class SpinnerComponent implements OnDestroy, OnInit {
  visible = false;

  private _spinnerStateChanged: Subscription;

  constructor(private _spinnerService: SpinnerService) { }

  ngOnInit() {
    //componentHandler.upgradeDom();
    this._spinnerStateChanged = this._spinnerService.spinnerState
      .subscribe((state: ISpinnerState) => this.visible = state.show);
  }

  ngOnDestroy() {
    this._spinnerStateChanged.unsubscribe();
  }
}