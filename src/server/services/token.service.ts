import AppSecrets from '../app.secrets';
import * as jwt from 'jsonwebtoken';
import { CryptService } from './_';
class TokenService {
    public getToken(id: string) {
        let payload = {
            id: id,
            iat: Math.floor(Date.now() / 1000)
        };
        let token = jwt.sign(
            payload,
            AppSecrets.auth.jwt.secret
        );
        return token;
    }

    public getTokenFromUsername(username: string) {
        let payload = {
            username: username,
            iat: Math.floor(Date.now() / 1000)
        };
        let token = jwt.sign(
            payload,
            AppSecrets.auth.jwt.secret
        );
        return token;
    }

    public authorize(cookies) {
        let dtoken;
        try {
            let token = cookies["token"];
            let id = cookies["id"];
            dtoken = jwt.verify(
                token,
                AppSecrets.auth.jwt.secret
            );
            if (Math.floor(Date.now() / 1000) - dtoken.iat > 86400 * 7)
                return 401;
            if (dtoken.id === id)
                return 1;
            else
                return 401;
        } catch (err) {
            return 401;
        }
    }

    public refreshToken(cookies) {
        let dtoken;
        let token = cookies["token"];
        let id = cookies["id"];
        dtoken = jwt.verify(
            token,
            AppSecrets.auth.jwt.secret
        );
        if (Math.floor(Date.now() / 1000) - dtoken.iat > 86400) {
            let payload = dtoken;
            payload.iat = Math.floor(Date.now() / 1000);
            let token = jwt.sign(
                payload,
                AppSecrets.auth.jwt.secret
            );
            return token;
        }
        return dtoken;
    }



    public getPasswordResetToken(id: string) {

        let payload = JSON.stringify({
            id: id,
            iat: Math.floor(Date.now() / 1000)
        });
        return CryptService.encrypt(payload);
    }

    public extractPayload(token: string) {
        try {
            return jwt.verify(
                token,
                AppSecrets.auth.jwt.secret
            );
        } catch (err) {
            return null;
        }
    }
}

export default new TokenService();