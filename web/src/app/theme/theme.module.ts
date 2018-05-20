import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  FooterComponent,
  HeaderComponent,
  LayoutComponent
} from './components';

import {
} from './pipes';

const BASE_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent
];

const PIPES = [
];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule
    };
  }
}
