import { NgModule } from '@angular/core';

import { ThemeModule } from '../../theme/theme.module';

import { SummaryComponent } from './summary.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    SummaryComponent,
  ],
})
export class SummaryModule { }
