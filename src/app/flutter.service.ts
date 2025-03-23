import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlutterService {
  private AngularflutterSdk: any;
  set setFlutterSDK(flutterSdk: any) {
    this.AngularflutterSdk = flutterSdk;
  }
  get getAngularflutterSdk() {
    if (this.AngularflutterSdk) {
      return this.AngularflutterSdk;
    } else {
      console.warn('No Flutter State found');
    }
  }

  constructor() { }


}
