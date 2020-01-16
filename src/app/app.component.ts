import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { UIService } from "./shared/ui.service";
import { Subscription } from "rxjs";
import { last } from "rxjs/operators";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('drawer', { static: false }) drawerComponent: RadSideDrawerComponent;

    activeChallenge: string = '';
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
        this.uiService.setRootVCRef(this.vcRef);
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
    }

}
