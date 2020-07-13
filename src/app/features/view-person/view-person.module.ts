import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPersonRoutingModule } from './view-person-routing.module';
import { ViewPersonComponent } from './view-person.component';

import { ChartModule } from '@syncfusion/ej2-angular-charts';
import {
  DateTimeService,
  LineSeriesService,
  DateTimeCategoryService,
  StripLineService,
} from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [ViewPersonComponent],
  imports: [CommonModule, ViewPersonRoutingModule, ChartModule],
  providers: [DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService],
})
export class ViewPersonModule {}
