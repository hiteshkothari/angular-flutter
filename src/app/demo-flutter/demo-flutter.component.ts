import { Component } from '@angular/core';



import { ChangeDetectorRef } from "@angular/core";
import { FlutterService } from "../flutter.service";
import { SdkComponent } from "../sdk/sdk.component";
import { NgFlutterComponent } from '../ng-flutter/ng-flutter.component';

@Component({
  selector: 'app-demo-flutter',
  templateUrl: './demo-flutter.component.html',
  imports: [SdkComponent],
  styleUrl: './demo-flutter.component.css'
})
export class DemoFlutterComponent {


  constructor(
    protected $flutterService: FlutterService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  onFlutterAppLoaded(flutterSdk: any) {
    console.log(flutterSdk);

    this.$flutterService.setFlutterSDK = flutterSdk;
    this.changeDetectorRef.detectChanges();
  }
}

