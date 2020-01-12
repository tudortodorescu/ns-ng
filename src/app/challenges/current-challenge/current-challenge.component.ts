import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css']
})
export class CurrentChallengeComponent {

    constructor(private router: RouterExtensions) { }

    goToChallengeEdit() {
        this.router.navigate(['/challenge-edit'], {
            transition: { name: 'slideLeft' }
        });
    }
}
