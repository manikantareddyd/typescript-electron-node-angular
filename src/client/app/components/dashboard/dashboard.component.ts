import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Hero } from '../../classes';
import { HeroService } from '../../services';
import { HeroDetailComponent } from '../../components';
@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    heroes: Hero[] = [];

    constructor(
        private heroService: HeroService,
        public dialog: MdDialog
    ) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => {
                this.heroes = heroes.slice(1, 5)
            });
    }

    gotoDetail(hero: Hero): void {
        let dialog = this.dialog.open(HeroDetailComponent, {
            data: hero
        });
    }
}
