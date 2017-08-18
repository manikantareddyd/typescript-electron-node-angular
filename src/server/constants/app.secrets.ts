export interface Facebook {
    tokenUrl: string;
    authUrl: string;
    appId: string;
    appSecret: string;
    callback: string;
}

export interface Twitter {
    consumerKey: string;
    consumerSecret: string;
    callback: string;
}

export interface Jwt {
    secret: string;
}

export interface Auth {
    facebook: Facebook;
    twitter: Twitter;
    jwt: Jwt;
}

export interface Email {
    service: string;
    username: string;
    password: string;
}

export interface AppSecrets {
    auth: Auth;
    email: Email;
    cryptSecret: string;
}

export default <AppSecrets>require("./app.secrets.json");