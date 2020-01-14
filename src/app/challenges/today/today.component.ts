import { Component, OnInit } from '@angular/core';
import { EnumChallengeActions } from '../challenge-actions/challenge-actions.component';

@Component({
    selector: 'ns-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onActionSelected(action: EnumChallengeActions) {
        console.log('action', action);
    }
}
