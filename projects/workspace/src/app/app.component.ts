import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgFlowchart } from 'projects/ng-flowchart/src/lib/model/flow.model';
import { NgFlowchartStepRegistry } from 'projects/ng-flowchart/src/lib/ng-flowchart-step-registry.service';
import { NgFlowchartCanvasDirective } from 'projects/ng-flowchart/src';
import { CustomStepComponent } from './custom-step/custom-step.component';
import { RouteStepComponent } from './custom-step/route-step/route-step.component';
import { FormStepComponent } from './form-step/form-step.component';
import { NestedFlowComponent } from './nested-flow/nested-flow.component';
import { dataFlow } from './partials/data-flow';
import { BasicStepComponent } from './basic-step/basic-step.component';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  title = 'workspace';

  callbacks: NgFlowchart.Callbacks = {};
 
  options: NgFlowchart.Options = {
    stepGap: 40,
    rootPosition: 'TOP_CENTER',
    zoom: {
      mode: 'MANUAL',
      skipRender: true,
    },
    dragScroll: ['RIGHT', 'MIDDLE'],
    orientation: 'VERTICAL',
    manualConnectors: false,
  };

  @ViewChild('normalStep')
  normalStepTemplate: TemplateRef<any>;

  sampleJson = JSON.stringify(dataFlow)
    

  // items = [
  //   {
  //     name: 'Numero',
  //     type: 'num',
  //     data: {
  //       name: 'Número',
  //       icon: { name: 'log-icon', color: 'blue' },
  //       config: {
  //         message: null,
  //         severity: null,
  //       },
  //     },
  //   },
  // ];

  customOps = [
    
    {
      paletteName: 'Click',
      step: {
        template: BasicStepComponent,
        type: 'basic',
        data: { name: 'abre excel'},
      },
    },
    {
      paletteName: 'Proceso',
      step: {
        template: CustomStepComponent,
        type: 'process',
        data: {
          name: 'Process',
        },
      },
    },
    {
      paletteName: 'Formulario',
      step: {
        template: FormStepComponent,
        type: 'form-step',
        data: '123',
      },
    },
    {
      paletteName: 'OK',
      step: {
        template: NestedFlowComponent,
        type: 'nested-flow',
        data: {
          name: 'Hacer esto',
        },
      },
    },
    {
      paletteName: 'De lo contrario',
      step: {
        template: NestedFlowComponent,
        type: 'nested-flow',
        data: {
          name: 'De lo contrario',
        },
      },
    },
  ];

  @ViewChild(NgFlowchartCanvasDirective)
  canvas: NgFlowchartCanvasDirective;

  disabled = false;

  constructor(
    private _utilS: UtilsService,
    private stepRegistry: NgFlowchartStepRegistry) {
    this.callbacks.onDropError = this.onDropError;
    this.callbacks.onMoveError = this.onMoveError;
    this.callbacks.afterDeleteStep = this.afterDeleteStep;
    this.callbacks.beforeDeleteStep = this.beforeDeleteStep;
    this.callbacks.onLinkConnector = this.onLinkConnector;
    this.callbacks.afterDeleteConnector = this.afterDeleteConnector;
    this.callbacks.afterScale = this.afterScale.bind(this);
  }

  ngAfterViewInit() {
      // this.stepRegistry.registerStep('rest-get', this.normalStepTemplate);
    // this.stepRegistry.registerStep('num', this.normalStepTemplate);
    this.stepRegistry.registerStep('basic', BasicStepComponent);
    this.stepRegistry.registerStep('process', CustomStepComponent);
    this.stepRegistry.registerStep('nested-flow', NestedFlowComponent);
    // this.stepRegistry.registerStep('form-step', FormStepComponent);
    this.stepRegistry.registerStep('process-step', RouteStepComponent);
    this.showUpload();
  }

  onDropError(error: NgFlowchart.DropError) {
    console.log(error, '<--- DropError');
  }

  onMoveError(error: NgFlowchart.MoveError) {
    console.log(error, '<--- MoveError');
  }

  beforeDeleteStep(step) {
    console.log(JSON.stringify(step.children), '<-- beforeDeleteStep');
  }

  afterDeleteStep(step) {
    console.log(JSON.stringify(step.children), '<--- afterDeleteStep');
  }

  onLinkConnector(conn) {
    console.log(conn, '<--- onLinkConnector');
  }

  afterDeleteConnector(conn) {
    console.log(conn, '<--- afterDeleteConnector');
  }

  afterScale(scale: number): void {
    //realistically you want to recursively get all steps in canvas
    const firstSetOfChildren = this.canvas.getFlow().getRoot().children;
    firstSetOfChildren.forEach(step => {
      if (step instanceof NestedFlowComponent) {
        step.nestedCanvas.setNestedScale(scale);
      }
    });
  }

  showUpload() {
    this.canvas.getFlow().upload(this.sampleJson);
  }

  showFlowData() {
    let json = this.canvas.getFlow().toJSON(4);

    console.log(JSON.parse (json));
    
   /*  var x = window.open();
    x.document.open();
    x.document.write(
      '<html><head><title>Flowchart Json</title></head><body><pre>' +
        json +
        '</pre></body></html>'
    );
    x.document.close(); */
  }

  clearData() {
    this.canvas.getFlow().clear();
  }

  onGapChanged(event) {
    this.options = {
      ...this.canvas.options,
      stepGap: parseInt(event.target.value),
    };
  }

  onSequentialChange(event) {
    this.options = {
      ...this.canvas.options,
      isSequential: event.target.checked,
    };
  }

  onOrientationChange(event) {
    this.canvas.setOrientation(
      event.target.checked ? 'HORIZONTAL' : 'VERTICAL'
    );
  }

  onDelete(id) {
    this.canvas.getFlow().getStep(id).destroy(true);
  }
  onGrow() {
    this.canvas.scaleUp();
  }
  onShrink() {
    this.canvas.scaleDown();
  }
  onReset() {
    this.canvas.setScale(1);
  }
}
