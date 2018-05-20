import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  styles: [':host {background-color: #eee;}']
})
export class PagesComponent {
}
