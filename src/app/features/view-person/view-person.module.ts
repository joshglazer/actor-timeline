import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPersonRoutingModule } from './view-person-routing.module';
import { ViewPersonComponent } from './view-person.component';

import { ChartModule } from '@syncfusion/ej2-angular-charts';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import {
  DateTimeService,
  LineSeriesService,
  DateTimeCategoryService,
  StripLineService,
} from '@syncfusion/ej2-angular-charts';
import { MovieHighlightedComponent } from './components/movie-highlighted/movie-highlighted.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ViewPersonComponent, MovieHighlightedComponent],
  imports: [
    CommonModule,
    ViewPersonRoutingModule,
    ChartModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  providers: [DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService],
})
export class ViewPersonModule {}
