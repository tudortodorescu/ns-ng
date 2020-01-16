import { Injectable } from "@angular/core";
import { BehaviorSubject, of, Observable } from "rxjs";
import { take, tap, switchMap } from 'rxjs/operators';
import { Challenge, ChallengeModel } from "./challenge.model";
import { DayStatus } from "./day.model";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

const FIREBASE_API_URL_CHALLENGE = 'https://ns-ng-course-7613c.firebaseio.com/challenge';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {

    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    private _saveToServer(challenge: Challenge) {
        this.authService.user.pipe(
            take(1),
            switchMap((currentUser: User) => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.put<ChallengeModel>(
                    `${FIREBASE_API_URL_CHALLENGE}/${currentUser.id}.json?auth=${currentUser.token}`,
                    challenge
                );
            })
        ).subscribe();
    }

    fetchCurrentChallenge(): Observable<ChallengeModel|null> {
        return this.authService.user.pipe(
            take(1),
            switchMap((currentUser: User) => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get<ChallengeModel>(
                    `${FIREBASE_API_URL_CHALLENGE}/${currentUser.id}.json?auth=${currentUser.token}`
                );
            }),
            tap((resData: ChallengeModel) => {
                if (!!resData) {
                    const loadedChallenge = new Challenge(
                        resData.title,
                        resData.description,
                        resData.year,
                        resData.month,
                        resData._days
                    );
                    this._currentChallenge.next(loadedChallenge);
                } else {
                    this._currentChallenge.next(null);
                }
            })
        );
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
