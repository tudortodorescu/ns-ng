import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ns-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

    isHighlighted = false;

    constructor() { }

    ngOnInit() {
    }

    onDemo() {
        this.isHighlighted = !this.isHighlighted;
    }

}
