import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { DemoFlutterComponent } from './app/demo-flutter/demo-flutter.component';
import { DisplayFlutterComponent } from './app/display-flutter/display-flutter.component';
import { NGFlutterComponent } from './app/ngflutter/ngflutter.component';

const appRoutes: Routes = [
  {
    path: 'FlutterSDK-1',
    component: DisplayFlutterComponent
  },
  { path: 'FlutterSDK-2', component: DemoFlutterComponent },
  { path: 'FlutterSDK-3', component: NGFlutterComponent },
  { path: '', redirectTo: 'FlutterSDK-3', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    importProvidersFrom(BrowserAnimationsModule)
  ]
})
