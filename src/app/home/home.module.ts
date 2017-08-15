import { ModuleWithProviders, NgModule, Pipe, PipeTransform } from '@angular/core';

import { RouterModule, ActivatedRoute, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: IndexComponent },
  { path: 'about', component: AboutComponent }
]);

@NgModule({
  imports: [
    SharedModule,
    homeRouting
  ],

  declarations: [
    HomeComponent, AboutComponent, IndexComponent
  ],
  exports: [HomeComponent, AboutComponent, IndexComponent, RouterModule],
  providers: []
})
export class HomeModule { }