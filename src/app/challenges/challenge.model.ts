import { Day, DayStatus } from "./day.model";

export class Challenge {
    constructor(
        public title: string,
        public description: string,
        public year: number,
        public month: number,
        private _days: Day[] = []
    ) {
        if (_days.length > 0) {
            return;
        }

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i < daysInMonth + 1; i++) {
            let date = new Date(year, month, i);
            let dayInWeek = date.getDay();
            _days.push({
                dayInMonth: i,
                dayInWeek: dayInWeek,
                date: date,
                status: DayStatus.Open
            })
        }
    }

    get currentDay() {
        return this._days.find(day => {
            return day.dayInMonth === new Date().getDate()
        });
    }

    get days() {
        return [...this._days];
    }
}

export interface ChallengeModel {
    title: string,
    description: string,
    month: number,
    year: number,
    _days: Day[]
}
