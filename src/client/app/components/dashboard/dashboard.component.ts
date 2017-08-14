import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Hero } from '../../classes/_';
import { HeroService } from '../../services/_';
import { HeroDetailComponent } from '../../components/_';
@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    heroes: Hero[] = [];

    constructor(
        private heroService: HeroService,
        public dialog: MdDialog,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(data => {
                console.log(data);
                if (data.httpStatus == 401)
                    this.router.navigate(["/"]);
                this.heroes = data.heroes.slice(1, 5)
            });
    }

    gotoDetail(hero: Hero): void {
        let dialog = this.dialog.open(HeroDetailComponent, {
            data: hero
        });
    }
}
