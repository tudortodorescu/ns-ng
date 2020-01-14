import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { EnumChallengeActions } from '../challenge-actions/challenge-actions.component';

@Component({
    selector: 'ns-day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {
    loadedDate: Date;

    constructor(
        private modalParams: ModalDialogParams
    ) { }

    ngOnInit() {
        this.loadedDate = (this.modalParams.context as { date: Date }).date;
    }

    onHandleInput(action: EnumChallengeActions) {
        this.modalParams.closeCallback(action);
    }

}
