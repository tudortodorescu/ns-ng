import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'ns-challenge-actions',
    templateUrl: './challenge-actions.component.html',
    styleUrls: ['./challenge-actions.component.scss']
})
export class ChallengeActionsComponent implements OnInit {
    @Output() actionSelect = new EventEmitter<EnumChallengeActions>();
    @Input() cancelText = 'Cancel';

    constructor() { }

    ngOnInit() {
    }

    onAction(action: EnumChallengeActions) {
        this.actionSelect.emit(action);
    }

}

export enum EnumChallengeActions {
    COMPLETE = 'complete',
    FAIL = 'fail',
    CANCEL = 'cancel'
}
