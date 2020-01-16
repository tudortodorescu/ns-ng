import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

const FIREBASE_API_KEY = 'AIzaSyBg_Y3iAZq1Dui0DtBLdarzWwzNG19Qmoo';
const FIREBASE_API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _signUpFinished = new BehaviorSubject<boolean>(null);
    private _signInSuccessful = new BehaviorSubject<boolean>(null);

    get signUpFinished() {
        return this._signUpFinished.asObservable();
    }

    get signInSuccessful() {
        return this._signInSuccessful.asObservable();
    }

    constructor(
        private http: HttpClient
    ) { }

    signUp(email: string, password: string) {
        return this.http.post(`${FIREBASE_API_URL}:signUp?key=${FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        } as FirebaseAuthSignupRequest).pipe(
            tap((resData: FirebaseAuthSignupResponse) => {
                console.log(resData);

                // check if resData correct
                if (true) {
                    this._signUpFinished.next(true);
                }
            })
        );
    }

    signIn(email: string, password: string) {
        return this.http.post(`${FIREBASE_API_URL}:signInWithPassword?key=${FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        } as FirebaseAuthSigninRequest).pipe(
            tap((resData: FirebaseAuthSigninResponse) => {
                console.log(resData);

                // check if resData correct
                if (true) {
                    this._signInSuccessful.next(true);
                } else {
                    this._signInSuccessful.next(false);
                }
            })
        );
    }
}

export interface FirebaseAuthSignupRequest {
    email: string,
    password: string,
    returnSecureToken: boolean
}

export interface FirebaseAuthSignupResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

export interface FirebaseAuthSigninRequest {
    email: string,
    password: string,
    returnSecureToken: boolean
}

export interface FirebaseAuthSigninResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered:	boolean
}
