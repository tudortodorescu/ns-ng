import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { SharedModule } from "~/app/shared/shared.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
    declarations: [ChallengeEditComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            {path: '', component: ChallengeEditComponent}
        ]),
        SharedModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeEditModule { }
