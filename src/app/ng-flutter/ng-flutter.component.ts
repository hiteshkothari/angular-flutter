import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InteractWuthFlutterService } from '../interact-wuth-flutter.service';

// The global _flutter namespace
declare var _flutter: any;
declare var window: {
  _debug: any
};

@Component({
  selector: 'ng-flutter',
  standalone: true,
  template: `
  <div>
  <div #flutterTarget>
    <!--  Here the FLutter will load and replace the below spinner div with flutter web build  -->
    <div class="spinner">
      Attaching Flutter Web SDK here
    </div>
  </div>
  </div>
  `,
  styles: [`
    :host div {
      width: 100%;
      height: 100%;
    }
    .spinner {
      display: flex;
      justify-content: center;
      align-items: center;    
    }`,
  ],
  imports: [
  ],
})
export class NgFlutterComponent implements AfterViewInit {
  // The target that will host the Flutter app.
  @ViewChild('flutterTarget') flutterTarget!: ElementRef;

  @Input() src: String = 'main.dart.js';
  @Input() assetBase: String = '';
  @Output() appLoaded: EventEmitter<Object> = new EventEmitter<Object>();

  ngAfterViewInit(): void {
    const target: HTMLElement = this.flutterTarget.nativeElement;

    _flutter.loader.loadEntrypoint({
      entrypointUrl: this.src,
      onEntrypointLoaded: async (engineInitializer: any) => {
        let appRunner = await engineInitializer.initializeEngine({
          hostElement: target,
          assetBase: this.assetBase,
        });
        await appRunner.runApp();
      }
    });

    // TODO 3
    target.addEventListener("flutter-initialized", (event: Event) => {
      // not state but actual function in js interlop thing

      let state = (event as CustomEvent).detail;

      window._debug = state;

      this.appLoaded.emit(state);
      // this.$interactWithDFlutter.flutterState = state;


    }, {
      once: true,
    });
  }
  constructor() {


  }
}
