import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule,
        ChallengeActionsModule
    ],
    declarations: [AppComponent, DayModalComponent],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [DayModalComponent]
})
export class AppModule { }
