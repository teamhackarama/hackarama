import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

const BASE_MODULES = [CommonModule, HttpClientModule];

const APP_MODULES = [
];

@NgModule({
  imports: [...BASE_MODULES, ...APP_MODULES],
  exports: [...BASE_MODULES],
  declarations: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule
    };
  }
}
