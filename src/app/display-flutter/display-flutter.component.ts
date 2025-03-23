import { ChangeDetectorRef, Component } from "@angular/core";
import { FlutterService } from "../flutter.service";
import { SdkComponent } from "../sdk/sdk.component";

@Component({
  selector: "app-display-flutter",
  imports: [SdkComponent],
  templateUrl: "./display-flutter.component.html",
  styleUrl: "./display-flutter.component.css",
})
export class DisplayFlutterComponent {
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
