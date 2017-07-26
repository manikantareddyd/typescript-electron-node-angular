import { Hero } from '../classes';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private getAllUrl = 'api/v1/heroes/getAll';
  private getOneUrl = 'api/v1/heroes/getOne';
  constructor(private http: Http, private authService: AuthService) { }

  getHeroes(): Promise<Hero[]> {
    let token = this.authService.getAuthdetails()["token"]
    let headers = new Headers({ 'Authorization': 'Bearer '+token  });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.getAllUrl, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  getHero(id: number): Promise<Hero> {
    let token = this.authService.getAuthdetails()["token"]
    let headers = new Headers({ 'Authorization': 'Bearer '+token  });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.getOneUrl + '/' + id.toString(), options)
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
