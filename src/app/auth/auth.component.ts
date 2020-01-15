import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;

    constructor(
        private router: RouterExtensions
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
                updateOn: 'blur',
                validators: [
                    Validators.required,
                    Validators.minLength(6)
                ]
            })
        });
    }

    onSignin() {
        this.router.navigate(['/today'], { clearHistory: true });
    }

}
