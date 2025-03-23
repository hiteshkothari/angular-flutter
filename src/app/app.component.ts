import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-root",
  template: `
   
    <mat-sidenav-container [hasBackdrop]="false" class="sidenav-container">
      <mat-sidenav  mode="side" [opened]="true" class="sidenav">
        <mat-nav-list>

        @for (link of list; track link) {
          <!-- {{router.url}}
          {{router.url == "/"+link.href}} -->
    <a mat-list-item [routerLink]="link.href"  [activated]="router.url == '/'+link.href">{{ link.href}}</a>
  }
            
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="sidenav-content">
<router-outlet />
 
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
      .sidenav-container {
        flex: 1;
      }
      .sidenav {
        width: 300px;
        padding: 10px;
      }
      .sidenav-content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
       
    `,
  ],
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatSidenavModule,
    CommonModule,
    MatListModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink
  ],
})
export class AppComponent {
  title = "Flutter Web App Demo ";
  list: any = [{ href: 'FlutterSDK-1', isActive: false }, { href: 'FlutterSDK-2', isActive: false }, { href: 'FlutterSDK-3', isActive: true }]
  constructor(
    protected router: Router
  ) { }

}
