import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: 'search', loadChildren: () => import('./features/search/search.module').then((m) => m.SearchModule) },
  { path: 'viewPerson', loadChildren: () => import('./features/view-person/view-person.module').then(m => m.ViewPersonModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
