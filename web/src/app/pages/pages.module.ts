import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme/theme.module';
import { SummaryModule } from './summary/summary.module';
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { FeedbackModule } from './feedback/feedback.module';
import { TimelineModule } from './timeline/timeline.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    SummaryModule,
    ThemeModule,
    FeedbackModule,
    TimelineModule
  ],
  declarations: [PagesComponent]
})
export class PagesModule { }
