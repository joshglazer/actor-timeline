import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SearchModule {}
