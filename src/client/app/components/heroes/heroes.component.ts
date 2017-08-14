import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Hero } from '../../classes/_';
import { HeroService } from '../../services/_';
import { MdGridListModule } from '@angular/material';
import { HeroDetailComponent } from '../../components/_';

@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private router: Router,
        private heroService: HeroService,
        public dialog: MdDialog
    ) { }

    getHeroes(): void {
        this.heroService.getHeroes()
            .then(data => {
                if (data.httpStatus == 401)
                    this.router.navigate(["/"]);
                this.heroes = data.heroes;
            });
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(hero: Hero): void {
        let dialog = this.dialog.open(HeroDetailComponent, {
            data: hero
        });
    }
}
