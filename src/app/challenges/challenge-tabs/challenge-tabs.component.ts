import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css']
})
export class ChallengeTabsComponent implements OnInit {

  constructor(
      private router: RouterExtensions,
      private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.navigate(
        [{
            outlets: {
                today: ['today'],
                currentChallenge: ['current-challenge']
            }
        }],
        { relativeTo: this.active }
    );
  }

}
