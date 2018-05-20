import { NgModule } from '@angular/core';

import { ThemeModule } from '../../theme/theme.module';

import { TimelineComponent } from './timeline.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    TimelineComponent,
  ],
})
export class TimelineModule { }
