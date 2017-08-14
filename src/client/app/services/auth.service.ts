import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    private loginUrl = 'auth/login';
    private logoutUrl = 'auth/logout';
    private registerUrl = 'auth/register';
    private validateUrl = 'auth/validateToken';
    private forgotPassUrl = 'auth/forgotpassword';
    private updateUsernameUrl = 'auth/updateUsername';
    private facebookUrl = 'auth/facebook';
    constructor(private http: Http, private router: Router, private cookieService: CookieService) { }

    public logout() {
        return this.http.get(this.logoutUrl)
            .toPromise()
            .then(res => {
                location.reload()
            })
    }
    public login(username: string, password: string) {
        let body = "username=" + username + "&password=" + password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, body, options)
            .toPromise()
            .then(this.saveToken)
            .catch();
    }

    public register(username: string, password: string) {
        let body = "username=" + username + "&password=" + password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.registerUrl, body, options)
            .toPromise()
            .then(this.saveToken)
            .catch();
    }

    public updateUsername(username: string) {
        let id = this.cookieService.get("id");
        let body = "username=" + username + "&id=" + id;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateUsernameUrl, body, options)
            .toPromise()
            .then(this.saveToken)
            .catch();
    }
    
    public forgotPassword(username: string) {
        console.log("hahahahahaha");
        let body = "username=" + username;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.forgotPassUrl, body, options)
            .toPromise()
            .then()
            .catch();
    }

    public saveToken(res: Response) {
        let body = JSON.parse(res["_body"]);
        let success = body["success"];
        console.log(success);
        return success;
    }

    public getAuthdetails() {
        let cookies = this.cookieService.getAll();
        return cookies;
    }

    public deleteAuthDetails() {
        this.cookieService.deleteAll();
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

    public facebook(id: string) {
        let headers = new Headers({ 'id': id, 'Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.facebookUrl + "?id=" + id, options)
            .toPromise()
            .then(this.saveToken)
            .catch(this.handleError);
    }
}
