import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    private loginUrl = 'login';
    private registerUrl = 'register';
    private validateUrl = 'validateToken';
    constructor(private http: Http) { }

    public login(username: string, password: string) {
        let body = "username=" + username + "&password=" + password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, body, options)
            .toPromise()
            .then(this.saveToken)
            .catch();
    }

    public register(username: string, password: string){
        let body = "username=" + username + "&password=" + password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.registerUrl, body, options)
            .toPromise()
            .then(this.saveToken)
            .catch();
    }

    public saveToken(res: Response) {
        let body = JSON.parse(res["_body"]);
        let token = body["token"];
        let username = body["username"];
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        console.log(res);
    }

    public getAuthdetails(){
        let token = localStorage["token"];
        let username = localStorage["username"];
        return {
            token: token,
            username: username
        };
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
