import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '~/app/shared/ui.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: [
        './current-challenge.component.common.css',
        './current-challenge.component.css'
    ]
})
export class CurrentChallengeComponent {

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private router: RouterExtensions
    ) { }

    onChangeStatus() {
        this.modalDialog.showModal(DayModalComponent, {
            fullscreen: true,
            viewContainerRef: (this.uiService.getRootVCRef() || this.vcRef),
            context: { date: new Date() }
        }).then((action:string) => {
            console.log('action', action);
        });
    }

    onTapReplace() {
        console.log('onTapReplace');
        this.router.navigate(['challenges/replace']);
    }

    onTapEdit() {
        console.log('onTapEdit');
        this.router.navigate(['challenges/edit']);
    }

}
