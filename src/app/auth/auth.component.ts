import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

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
    isLoading: boolean = false;
    @ViewChild('passwordEl', { static: false }) passowrdEl: ElementRef<TextField>;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;
    private _subscriptionList: Subscription[] = [];

    constructor(
        private router: Router,
        private authService: AuthService,
        private changeDetection: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [
                    Validators.required,
                    Validators.email
                ]
            }),
            password: new FormControl(null, {
                updateOn: 'change',
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
        this.isLoading = true;
        this.changeDetection.detectChanges();

        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        // this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;

        if (this.isLogin) this.authService.signIn(email, password).subscribe(() => {
            this.router.navigate(['/challenges']);
            this.isLoading = false;
            this.changeDetection.detectChanges();

        }, err => {
            this.isLoading = false;
            this.changeDetection.detectChanges();
        });
        else this.authService.signUp(email, password).subscribe(() => {
            alert("Congratulations! You just signed-up and have access to all the cool features!")
            this.router.navigate(['/challenges']);
            this.isLoading = false;
            this.changeDetection.detectChanges();

        }, err => {
            this.isLoading = false;
            this.changeDetection.detectChanges();
        });
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }

}
