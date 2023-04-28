import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReconciliationRoutingModule } from './reconciliation-routing.module';
import { ReconciliationComponent } from './reconciliation.component';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


@NgModule({
  declarations: [
    ReconciliationComponent
  ],
  imports: [
    CommonModule,
    ReconciliationRoutingModule,
    FormsModule,
    NzTableModule,
    NzSelectModule,
    NzLayoutModule
  ]
})
export class ReconciliationModule { }
