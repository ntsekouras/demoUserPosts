import { Component } from '@angular/core';
import { SpinnerService } from "./core/spinner/spinner.service";

@Component({
  selector: 'story-404',
  template: `
    <article class="template animated slideInRight">
      <h4>Inconceivable!</h4>
      <div>I do not think this page is where you think it is.</div>
    </article>
  `
})
export class PageNotFoundComponent {


    constructor(protected _spinnerService: SpinnerService) {
        _spinnerService.hide();

    }
}