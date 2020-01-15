import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/common';
import { UIService } from '~/app/shared/ui.service';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';
import { Subscription } from 'rxjs';
import { Day } from '../day.model';

@Component({
    selector: 'ns-challenge-calendar',
    templateUrl: './challenge-calendar.component.html',
    styleUrls: ['./challenge-calendar.component.scss']
})
export class ChallengeCalendarComponent implements OnInit, OnDestroy {
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    currentChallenge: Challenge;
    private _subscriptionList: Subscription[] = [];

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private challengeService: ChallengeService
    ) { }

    ngOnInit() {
        this._subscriptionList.push(
            this.challengeService.currentChallenge.subscribe((challenge: Challenge) => {
                this.currentChallenge = challenge;
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

    getIsSettable(dayInMonth: number) {
        return dayInMonth <= new Date().getDate();
    }

    getRow(index: number, day: any) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(
            this.currentChallenge.year,
            this.currentChallenge.month,
            1
        ).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

        return startRow + weekRow + irregularRow;
    }

    onChangeStatus(day: Day) {
        if (!this.getIsSettable(day.dayInMonth)) {
            return;
        }
        this.modalDialog.showModal(DayModalComponent, {
            fullscreen: true,
            viewContainerRef: (this.uiService.getRootVCRef() || this.vcRef),
            context: { date: day.date }
        }).then((action: string) => {
            console.log('action', action);
        });
    }
}
