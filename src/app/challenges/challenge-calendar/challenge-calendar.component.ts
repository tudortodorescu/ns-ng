import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/common';
import { UIService } from '~/app/shared/ui.service';
import { DayModalComponent } from '../day-modal/day-modal.component';

@Component({
    selector: 'ns-challenge-calendar',
    templateUrl: './challenge-calendar.component.html',
    styleUrls: ['./challenge-calendar.component.scss']
})
export class ChallengeCalendarComponent implements OnInit {
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    days: EnumChallengeCalendarDays[] = [];
    private currentYear = new Date().getFullYear();
    private currentMonth = new Date().getMonth();

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
    ) { }

    ngOnInit() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        for (let i = 1; i < daysInMonth + 1; i++) {
            let date = new Date(this.currentYear, this.currentMonth, i);
            let dayInWeek = date.getDay();
            this.days.push({
                dayInMonth: i,
                dayInWeek: dayInWeek
            })
        }
    }

    getRow(index: number, day: EnumChallengeCalendarDays) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

        return startRow + weekRow + irregularRow;
    }

    onChangeStatus() {
        this.modalDialog.showModal(DayModalComponent, {
            fullscreen: true,
            viewContainerRef: (this.uiService.getRootVCRef() || this.vcRef),
            context: { date: new Date() }
        }).then((action: string) => {
            console.log('action', action);
        });
    }
}

export interface EnumChallengeCalendarDays {
    dayInMonth: number;
    dayInWeek: number;
}
