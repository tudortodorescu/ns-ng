import { Component, OnInit } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit {

    isCreating: boolean = true;

    constructor(
        private pageRoute: PageRoute
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

}
