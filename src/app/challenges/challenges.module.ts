import { NgModule } from '@angular/core';
import { ChallengesRoutingModule } from './chllanges-routing.module';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { TodayComponent } from './today/today.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ChallengeEditComponent } from './challenge-edit/challenge-edit.component';
import { SharedModule } from '../shared/shared.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ChallengesRoutingModule,
        SharedModule
    ],
    declarations: [
        ChallengeEditComponent,
        ChallengeTabsComponent,
        CurrentChallengeComponent,
        TodayComponent
    ]
})
export class ChallengesModule { }
