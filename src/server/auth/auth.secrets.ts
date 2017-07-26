interface Facebook {
    token_url: string,
    auth_url: string,
    app_id: string;
    app_secret: string;
    callback: string;
}

interface Jwt {
    secret: string;
}

interface AuthSecrets {
    facebook: Facebook;
    jwt: Jwt;
}

export default <AuthSecrets>require("./auth.config.json");