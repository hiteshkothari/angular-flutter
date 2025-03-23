import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

declare var _flutter: any;
// For Debugging Purpose
// declare var window: {
//   _debug: any
// };
@Component({
  selector: 'app-sdk',
  imports: [],
  standalone: true,
  templateUrl: './sdk.component.html',
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
})
export class SdkComponent implements AfterViewInit {
  @ViewChild('displayFlutterSDK') displayFlutterSDK!: ElementRef;


  @Input() src: String = 'main.dart.js';
  @Input() assetBase: String = '';
  @Output() appLoaded: EventEmitter<Object> = new EventEmitter<Object>();

  ngAfterViewInit(): void {
    const displayFlutterSDK: HTMLElement = this.displayFlutterSDK.nativeElement;

    _flutter.loader.loadEntrypoint({
      entrypointUrl: this.src,
      onEntrypointLoaded: async (engineInitializer: any) => {
        let appRunner = await engineInitializer.initializeEngine({
          hostElement: displayFlutterSDK,
          assetBase: this.assetBase,
          // multiViewEnabled: true,
        });
        await appRunner.runApp();
      }
    });

    displayFlutterSDK.addEventListener("flutter-initialized", (event: Event) => {
      let state = (event as CustomEvent).detail;
      // window._debug = state;
      this.appLoaded.emit(state);
    }, {
      once: true,
    });
  }
} 
