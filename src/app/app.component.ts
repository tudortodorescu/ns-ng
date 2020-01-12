import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { UIService } from "./shared/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('drawer', {static: false}) drawerComponent: RadSideDrawerComponent;

    activeChallenge = '';
    private drawerSub: Subscription;

    constructor(private uiService: UIService, private changeDetectionRef: ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            this.drawerComponent.sideDrawer.toggleDrawerState();
        });
        this.changeDetectionRef.detectChanges();
    }

}
