import { NgModule } from '@angular/core';

import { ThemeModule } from '../../theme/theme.module';

import { FeedbackComponent } from './feedback.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    FeedbackComponent,
  ],
})
export class FeedbackModule { }
