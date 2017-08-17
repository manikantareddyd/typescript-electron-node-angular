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

export interface AuthSecrets {
    facebook: Facebook;
    twitter: Twitter;
    jwt: Jwt;
}

interface EmailSecrets {
    service: string
    username: string,
    password: string
}

interface AppSecrets {
    auth: AuthSecrets,
    email: EmailSecrets,
    crypt_secret: string
}




export default <AppSecrets>require("./app.secrets.json");