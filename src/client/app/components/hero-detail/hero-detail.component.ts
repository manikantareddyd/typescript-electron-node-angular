import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MD_DIALOG_DATA } from '@angular/material';
import { Hero } from '../../classes/_';
import { HeroService } from '../../services/_';
@Component({
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    public hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location,
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.hero = this.data;
    }

    goBack(): void {
        this.location.back();
    }
}
