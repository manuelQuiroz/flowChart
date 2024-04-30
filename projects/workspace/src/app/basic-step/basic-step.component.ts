import { Component, OnInit } from '@angular/core';
import { NgFlowchartStepComponent } from 'projects/ng-flowchart/src/lib/ng-flowchart-step/ng-flowchart-step.component';
import { NgFlowchart } from 'projects/ng-flowchart/src';

@Component({
  selector: 'app-basic-step',
  templateUrl: './basic-step.component.html',
  styleUrls: ['./basic-step.component.scss'],
})
export class BasicStepComponent
  extends NgFlowchartStepComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {
    // console.log(this.data);
  }


  getDropPositionsForStep(
    pendingStep: NgFlowchart.PendingStep
  ): NgFlowchart.DropPosition[] {
      return ['ABOVE', 'LEFT', 'RIGHT', 'BELOW'];
  }
}
