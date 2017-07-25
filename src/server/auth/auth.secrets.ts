interface Facebook {
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