import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [LandingComponent],
    imports: [
      CommonModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      LandingRoutingModule,
      SharedModule
    ],
  })
  export class LandingModule { }