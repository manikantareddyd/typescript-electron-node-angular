export interface Facebook {
    token_url: string;
    auth_url: string;
    app_id: string;
    app_secret: string;
    callback: string;
}

export interface Twitter {
    consumer_key: string;
    consumer_secret: string;
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