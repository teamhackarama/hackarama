import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme/theme.module';
import { SummaryModule } from './summary/summary.module';
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    SummaryModule,
    ThemeModule
  ],
  declarations: [PagesComponent]
})
export class PagesModule { }
