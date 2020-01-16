import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { alert } from 'tns-core-modules/ui/dialogs';
import { User, UserModel } from "./user.model";
import { RouterExtensions } from "nativescript-angular/router";
import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';
import { getUTCLocalDate } from "../shared/common";
import { ChallengeService } from "../challenges/challenge.service";

const FIREBASE_API_KEY = 'AIzaSyBg_Y3iAZq1Dui0DtBLdarzWwzNG19Qmoo';
const FIREBASE_API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

interface FirebaseAuthenticateRequest {
    email: string;
    password: string;
    returnSecureToken: boolean;
}

interface FirebaseAuthenticateResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);
    private _tokenExpirationTimer: number;

    get user() {
        return this._user.asObservable();
    }

    constructor(
        private http: HttpClient,
        private router: RouterExtensions
    ) { }

    private _authenticate(authType: 'signin' | 'signup', email: string, password: string) {
        let authMethod = '';
        switch (authType) {
            case 'signin':
                authMethod = 'signInWithPassword';
                break;
            case 'signup':
                authMethod = 'signUp';
                break;
        }
        return this.http.post(`${FIREBASE_API_URL}:${authMethod}?key=${FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        } as FirebaseAuthenticateRequest).pipe(
            catchError(errorRes => {
                this._handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            tap((resData: FirebaseAuthenticateResponse) => {
                if (resData && resData.idToken) {
                    const expirationDate = new Date(
                        getUTCLocalDate().getTime() + (parseInt(resData.expiresIn) * 1000)
                    );

                    const user = new User(
                        email,
                        resData.localId,
                        resData.idToken,
                        expirationDate
                    );

                    setString('userData', JSON.stringify(user));
                    this.autoLogout(user.timeToExpiry);
                    this._user.next(user);
                }
            })
        );
    }

    signUp(email: string, password: string) {
        return this._authenticate('signup', email, password);
    }

    signIn(email: string, password: string) {
        return this._authenticate('signin', email, password);
    }

    logout() {
        this._user.next(null);
        remove('userData');
        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }
        this.router.navigate(['/auth'], { clearHistory: true });
    }

    autoLogin(): Observable<boolean> {
        if (!hasKey('userData')) {
            return of(false);
        }
        const userData = <UserModel>JSON.parse(getString('userData'));
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            return of(true);
        }
        return of(false);
    }

    autoLogout(expiryDuration: number) {
        this._tokenExpirationTimer = setTimeout(() => {
            alert('Your session expired. Please login again to continue. Sorry for the inconvenience');
            this.logout();
        }, expiryDuration);
    }

    private _handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert('The email address is already in use by another account.');
                break;
            case 'OPERATION_NOT_ALLOWED':
                alert('Password sign-in is disabled for this project.');
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                alert('We have blocked all requests from this device due to unusual activity. Try again later.');
                break;
            case 'EMAIL_NOT_FOUND':
                alert('There is no user record corresponding to this identifier. The user may have been deleted.');
                break;
            case 'INVALID_PASSWORD':
                alert('The password is invalid or the user does not have a password.');
                break;
            case 'USER_DISABLED':
                alert('The user account has been disabled by an administrator.');
                break;
            default:
                alert('Unknown error. Please check server connection.');
        }
    }
}
