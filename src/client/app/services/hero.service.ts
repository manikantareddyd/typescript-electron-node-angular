import { Hero } from '../classes/hero';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private getAllUrl = 'api/v1/heroes/getAll';
  private getOneUrl = 'api/v1/heroes/getOne';
  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.getAllUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  getHero(id: number): Promise<Hero> {
    return this.http.get(this.getOneUrl + '/' + id.toString())
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
