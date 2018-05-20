import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">&copy; <a href="https://nationwide.com" target="_blank">Flash Feedback</a> 2018</span>
  `,
})
export class FooterComponent {
}
