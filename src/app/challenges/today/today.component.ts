import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';
import { Day, DayStatus } from '../day.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'ns-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {
    currentDay: Day;
    private _subscriptionList: Subscription[] = [];

    constructor(
        private challengeService: ChallengeService
    ) { }

    ngOnInit() {
        this._subscriptionList.push(
            this.challengeService.currentChallenge.pipe(
                filter(data => (data !== null))
            ).subscribe((challenge:Challenge) => {
                this.currentDay = challenge.currentDay;
            })
        );
    }

    ngOnDestroy() {
        if (this._subscriptionList.length > 0) {
            this._subscriptionList.forEach((subscription: Subscription) => {
                subscription.unsubscribe();
            })
        }
    }

    getActionName() {
        if (this.currentDay.status === DayStatus.Completed) {
            return 'complete';
        }
        if (this.currentDay.status === DayStatus.Failed) {
            return 'fail';
        }
        return null;
    }

    onActionSelected(action: DayStatus) {
        this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action);
    }
}
