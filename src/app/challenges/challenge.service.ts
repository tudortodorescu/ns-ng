import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take, tap } from 'rxjs/operators';
import { Challenge, ChallengeModel } from "./challenge.model";
import { DayStatus } from "./day.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    constructor(
        private http: HttpClient
    ) {

    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    private _saveToServer(challenge: Challenge) {
        const apiUrl = 'https://ns-ng-course-7613c.firebaseio.com/challenge.json';
        this.http.put<ChallengeModel>(apiUrl, challenge).subscribe();
    }

    fetchCurrentChallenge() {
        return this.http.get<ChallengeModel>('https://ns-ng-course-7613c.firebaseio.com/challenge.json')
            .pipe(tap((resData: ChallengeModel) => {
                if (resData) {
                    const loadedChallenge = new Challenge(
                        resData.title,
                        resData.description,
                        resData.year,
                        resData.month,
                        resData._days
                    );
                    this._currentChallenge.next(loadedChallenge);
                }
            }));
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(
            title,
            description,
            new Date().getFullYear(),
            new Date().getMonth()
        );
        this._currentChallenge.next(newChallenge);
        this._saveToServer(newChallenge);
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe((challenge: Challenge) => {
            const updatedChallenge = new Challenge(
                title,
                description,
                challenge.year,
                challenge.month,
                challenge.days
            );
            this._currentChallenge.next(updatedChallenge);
            this._saveToServer(updatedChallenge);
        });
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe((challenge: Challenge) => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }
            const dayIndex = challenge.days.findIndex(
                d => d.dayInMonth === dayInMonth
            );
            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);
            this._saveToServer(challenge);
        });
    }

}
