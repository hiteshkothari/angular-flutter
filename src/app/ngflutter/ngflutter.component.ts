import { Component } from '@angular/core';


import { CommonModule } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgFlutterComponent } from '../ng-flutter/ng-flutter.component';
import { InteractWuthFlutterService } from '../interact-wuth-flutter.service';



@Component({
  standalone: true,
  selector: 'app-ngflutter',
  template: `
   
    <mat-sidenav-container [hasBackdrop]="false" class="sidenav-container">
      <mat-sidenav  mode="side" [opened]="true" class="sidenav">
        <mat-nav-list autosize>
          <section>
            <h2>JS Interop</h2>
            <mat-form-field appearance="outline">
              <mat-label>Select Sample App</mat-label>
              <mat-select
                (valueChange)="goToPage($event)"
                [value]="this.iFlutter.flutterState?.getScreen()"
              >
                <mat-option value="counter">Counter App</mat-option>
                <mat-option value="text">Text input Demo</mat-option>
                <mat-option value="dash" selected> Custom App Demo </mat-option>
                <mat-option value="external" selected> External </mat-option>
              </mat-select>
            </mat-form-field>
            <!-- @if (this.iFlutter.flutterState?.getScreen() === 'counter') { -->
            <mat-form-field appearance="outline">
              <mat-label>Clicks</mat-label>
              <input
                type="number"
                matInput
                (input)="onCounterSet($event)"
                [value]="this.flutterState?.getClicks()"
              />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Text</mat-label>
              <input
                type="text"
                matInput
                (input)="onTextSet($event)"
                [value]="this.flutterState?.getText()"
              />
              
              <button
                matSuffix
                mat-icon-button
                aria-label="Clear"
                (click)="this.flutterState?.setText('')"
              >
                <mat-icon>close</mat-icon>
              </button>
             
            </mat-form-field>
           

          </section>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="sidenav-content">
      
        
        <div class="flutter-app" #container>
          <!-- http://localhost:53826/ -->
           @if (!showexternal){
Showing main
             <ng-flutter
            src="web/main.dart.js"
            assetBase="/web/"
            (appLoaded)="onFlutterAppLoaded($event)"
          ></ng-flutter>
        }
@else {
  shoowung external
  <ng-flutter
            src="external/main.dart.js"
            assetBase="/external/"
            (appLoaded)="onFlutterAppLoaded($event)"
          ></ng-flutter> 
}
        
         
        </div>
         
        <div>
     
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        flex-direction: column;
      }
      .toolbar-spacer {
        flex: 1 1 auto;
      }
      .sidenav-container {
        flex: 1;
      }
      .sidenav {
        width: 300px;
        padding: 10px;
      }
      .button-list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 20px;
      }
      .button-list button {
        min-width: 130px;
      }
      .sidenav-content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .flutter-app {
        border: 2px solid #eee;
        border-radius: 5px;
        height: 480px;
        width: 320px;
        transition: all 150ms ease-in-out;
        overflow: hidden;
      }
    `,
  ],
  imports: [
    NgFlutterComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class NGFlutterComponent {
  title = "dr";
  flutterState?: any;

  constructor(
    protected iFlutter: InteractWuthFlutterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  onFlutterAppLoaded(state: any) {
    console.log("Aoooc", state);
    this.flutterState = state;
    // this.flutterState.onClicksChanged(() => { this.onCounterChanged() });
    // this.flutterState.onTextChanged(() => { this.onTextChanged() });

    this.iFlutter.flutterLoaded(state);
    this.iFlutter.flutterState.onClicksChanged(() => {
      //  this.onCounterChanged() 
      this.onFlutterEndChanged()
    });
    this.iFlutter.flutterState.onTextChanged(() => {
      this.onFlutterEndChanged()

      // this.onTextChanged()
    });

    // this.flutterState.onTextChanged(() => {

    //   this.onFlutterEndChanged()
    // });
    this.setValueAgain();

  }
  setValueAgain() {
    this.iFlutter.updateFlutter({ key: 'counter', value: 12 }, this.flutterState)
    this.iFlutter.flutterState.setText("Hello Again");
  }
  // onFlutterAppLoaded1(state: any) {
  //   console.log(state);

  //   // this.iFlutter.flutterLoaded(state);
  // }

  onCounterSet(event: Event) {
    let clicks = parseInt((event.target as HTMLInputElement).value, 10) || 0;
    this.iFlutter.updateFlutter({ key: 'counter', value: clicks }, this.flutterState)
  }

  onTextSet(event: Event) {
    this.iFlutter.flutterState.setText((event.target as HTMLInputElement).value || "");
  }
  onCounterChanged() {
    this.changeDetectorRef.detectChanges();
  }
  onTextChanged() {
    this.changeDetectorRef.detectChanges();
  }
  showexternal = false;

  goToPage(event: any) {
    console.log('gotoPage ', event);

    switch (event) {
      case "external":
        this.showexternal = true;
        break;

      default:
        this.showexternal = false;

        this.iFlutter.flutterState?.setScreen(event);
        break;
    }

  }

  onFlutterEndChanged() {
    this.changeDetectorRef.detectChanges();

  }


}
