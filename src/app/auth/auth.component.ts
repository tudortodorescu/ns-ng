import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLogin: boolean = true;
    @ViewChild('passwordEl', { static: false }) passowrdEl: ElementRef<TextField>;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;
    private _subscriptionList: Subscription[] = [];

    constructor(
        private router: Router
    ) { }

    ngOnInit() {

        // TEMP
        // this.router.navigate(['/challenges']);

        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [
                    Validators.required,
                    Validators.email
                ]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [
                    Validators.required,
                    Validators.minLength(6)
                ]
            })
        });

        this._subscriptionList.push(
            this.form.get('email').statusChanges.subscribe(emailStatus => {
                this.emailControlIsValid = emailStatus === 'VALID';
            }),
            this.form.get('password').statusChanges.subscribe(passwordStatus => {
                this.passwordControlIsValid = passwordStatus === 'VALID';
            })
        )
    }

    ngOnDestroy() {
        if (this._subscriptionList.length > 0) {
            this._subscriptionList.forEach((subscription: Subscription) => {
                subscription.unsubscribe();
            })
        }
    }

    onSubmit() {
        if (!this.form.valid) return;

        this.emailEl.nativeElement.dismissSoftInput();
        this.passowrdEl.nativeElement.dismissSoftInput();

        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;

        console.log(email, password);

        if (this.isLogin) {
            console.log('Loggin in...')
        } else {
            console.log('Signing up...')
        }

        this.router.navigate(['/challenges']);
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }

}
