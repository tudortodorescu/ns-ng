import { getUTCLocalDate } from "../shared/common";

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token(): string {
        if (!this._token) {
            return null;
        }

        if (!this._tokenExpirationDate || getUTCLocalDate() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get isAuth(): boolean {
        return !!this.token;
    }

    get timeToExpiry() {
        return this._tokenExpirationDate.getTime() - getUTCLocalDate().getTime();
    }

}

export interface UserModel {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: Date;
}
