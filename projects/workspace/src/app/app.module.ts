import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgFlowchartModule } from 'projects/ng-flowchart/src/lib/ng-flowchart.module';
import { AppComponent } from './app.component';
import { CustomStepComponent } from './custom-step/custom-step.component';
import { RouteStepComponent } from './custom-step/route-step/route-step.component';
import { NestedFlowComponent } from './nested-flow/nested-flow.component';
import { FormStepComponent } from './form-step/form-step.component';
import { FormsModule } from '@angular/forms';
import { BasicStepComponent } from './basic-step/basic-step.component';
import { UtilsService } from './services/utils.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomStepComponent,
    RouteStepComponent,
    NestedFlowComponent,
    FormStepComponent,
    BasicStepComponent
  ],
  imports: [BrowserModule, NgFlowchartModule, FormsModule],
  providers: [UtilsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
