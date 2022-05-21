import { DetailsComponent } from './details/details.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule],
  exports: [DetailsComponent],
})
export class SharedModule {}