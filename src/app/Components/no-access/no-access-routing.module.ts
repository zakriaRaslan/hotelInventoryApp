import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAccessComponent } from './no-access.component';

const routes: Routes = [{ path: '', component: NoAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoAccessRoutingModule { }
