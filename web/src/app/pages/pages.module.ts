import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    DashboardModule,
    ThemeModule
  ],
  declarations: [PagesComponent]
})
export class PagesModule { }
