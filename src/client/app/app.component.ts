import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  public title = 'demo app - nik tsekouras';
  public menuItems = [
    { label: 'Dashboard', link: ['dashboard'], icon: "dashboard" },
    { label: 'Users', link: ['users'], icon: "people" }
  ];
}