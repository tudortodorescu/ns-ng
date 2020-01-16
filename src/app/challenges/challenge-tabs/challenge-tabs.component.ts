import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ChallengeService } from '../challenge.service';
import { AuthService } from '~/app/auth/auth.service';

@Component({
    selector: 'ns-challenge-tabs',
    templateUrl: './challenge-tabs.component.html',
    styleUrls: [
        './challenge-tabs.component.common.css',
        './challenge-tabs.component.ios.css',
        './challenge-tabs.component.android.css'
    ]
})
export class ChallengeTabsComponent implements OnInit {
    isLoading: boolean = false;

    constructor(
        private router: RouterExtensions,
        private active: ActivatedRoute,
        private page: Page,
        private challengeService: ChallengeService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.challengeService.fetchCurrentChallenge().subscribe(
            res => {
                this.isLoading = false;
                this._loadTabRoutes();
            }, err => {
                console.error(err);
                this.isLoading = false;
            }
        );
        this.page.actionBarHidden = true;
    }

    private _loadTabRoutes() {
        setTimeout(() => {
            this.router.navigate(
                [{
                    outlets: {
                        today: ['today'],
                        currentChallenge: ['current-challenge']
                    }
                }],
                { relativeTo: this.active }
            );
        }, 10);
    }

}
