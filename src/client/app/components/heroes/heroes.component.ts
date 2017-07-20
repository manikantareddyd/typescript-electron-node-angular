import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Hero } from '../../classes/hero';
import { HeroService } from '../../services/hero.service';
import {MdGridListModule} from '@angular/material';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

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
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
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
