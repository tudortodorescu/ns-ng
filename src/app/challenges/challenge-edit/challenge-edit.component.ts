import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { ChallengeService } from '../challenge.service';

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit {

    isCreating: boolean = true;

    constructor(
        private router: RouterExtensions,
        private pageRoute: PageRoute,
        private challengeService: ChallengeService
    ) { }

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(paramMap => {
                if (!paramMap.has('mode')) {
                    this.isCreating = true;
                } else {
                    this.isCreating = paramMap.get('mode') !== 'edit';
                }
            })
        });
    }

    onSubmit(title: string, description: string) {
        this.challengeService.createNewChallenge(title, description);
        this.router.navigate(['/challenges/tabs']);
    }
}
