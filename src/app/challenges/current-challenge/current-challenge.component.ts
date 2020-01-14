import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: [
        './_current-challenge.component.common.scss',
        './current-challenge.component.ios.scss',
        './current-challenge.component.android.scss'
    ]
})
export class CurrentChallengeComponent implements OnInit {

    constructor(
        private router: RouterExtensions
    ) { }

    ngOnInit() {
    }

    onTapReplace() {
        console.log('onTapReplace');
        this.router.navigate(['/challenges/replace']);
    }

    onTapEdit() {
        console.log('onTapEdit');
        this.router.navigate(['/challenges/edit']);
    }

}
