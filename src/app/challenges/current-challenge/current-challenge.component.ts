import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { take } from 'rxjs/operators';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';

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

    isEditDisabled: boolean = false;

    constructor(
        private router: RouterExtensions,
        private challengesService: ChallengeService
    ) { }

    ngOnInit() {
        this.challengesService.currentChallenge.pipe(take(1)).subscribe((challenge: Challenge) => {
            this.isEditDisabled = (challenge === null);
        });
    }

    onTapReplace() {
        this.router.navigate(['/challenges/replace']);
    }

    onTapEdit() {
        this.router.navigate(['/challenges/edit']);
    }

}
