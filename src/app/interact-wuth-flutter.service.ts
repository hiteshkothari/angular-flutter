import { ApplicationRef, Injectable } from '@angular/core';
import { ChangeDetectorRef, Component } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InteractWuthFlutterService {
  flutterState?: any;

  constructor(
    // private changeDetectorRef: ChangeDetectorRef,
    private ref: ApplicationRef

  ) {
    this.flutterState?.onFlutterEndChaned(() => {
      this.ref.tick();
      // this.changeDetectorRef.detectChanges();
    });
    this.flutterState?.onTextChanged(() => {
      this.ref.tick()

      // this.onTextChanged()
    });

  }


  flutterLoaded(state: any) {
    this.flutterState = state;
  }
  updateFlutter(data: any, flutterState: any) {



    // let sendToFlutter = this.flutterState?.receivedFromJS;
    // this.flutterState?.receivedFromJS
    if (data.key == 'counter') {

      flutterState.setClicks(data.value);
    } else {
      console.log('Update Some things');
      this.flutterState?.receivedFromJS(data);


    }


  }
  // updateWeb() {
  //   this.changeDetectorRef.detectChanges();
  // }


}
