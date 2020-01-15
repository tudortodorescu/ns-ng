import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';
import { take } from 'rxjs/operators';

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit {

    isCreating: boolean = true;
    title: string = '';
    description: string = '';

    constructor(
        private router: RouterExtensions,
        private pageRoute: PageRoute,
        private challengeService: ChallengeService
    ) { }

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(paramMap => {
                this.isCreating = (!paramMap.has('mode')) || (paramMap.get('mode') !== 'edit');

                if (!this.isCreating) {
                    this.challengeService.currentChallenge.pipe(take(1)).subscribe((challenge: Challenge) => {
                        this.title = challenge.title;
                        this.description = challenge.description;
                    });
                }
            })
        });
    }

    onSubmit(title: string, description: string) {
        if (this.isCreating) this.challengeService.createNewChallenge(title, description);
        else this.challengeService.updateChallenge(title, description);
        this.router.navigate(['/challenges/tabs']);
    }
}
