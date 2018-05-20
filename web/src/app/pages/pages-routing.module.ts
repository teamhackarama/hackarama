import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SummaryComponent } from './summary/summary.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'summary',
      component: SummaryComponent,
    },
    {
      path: 'timeline',
      component: TimelineComponent,
    },
    {
      path: 'feedback',
      component: FeedbackComponent,
    },
    {
      path: '',
      redirectTo: 'summary',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
