import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/reconciliation' },
  { path: 'reconciliation', loadChildren: () => import('./pages/reconciliation/reconciliation.module').then(m => m.ReconciliationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
