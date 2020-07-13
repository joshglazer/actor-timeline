import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPersonRoutingModule } from './view-person-routing.module';
import { ViewPersonComponent } from './view-person.component';


@NgModule({
  declarations: [ViewPersonComponent],
  imports: [
    CommonModule,
    ViewPersonRoutingModule
  ]
})
export class ViewPersonModule { }
