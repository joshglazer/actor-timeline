import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    // Vendor
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    // Material
    MatToolbarModule,
  ],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
