import * as crypto from 'crypto';
import * as uuid from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import AppSecrets from '../app.secrets';
import { Users } from '../db/models/_';
import { Request, Response } from 'express';
class AuthService {
    public validatePassword(user, password) {
        let salt = user.salt;
        let hashpass = this.hashPassword(password, salt);
        return (hashpass === user.hashpass);
    }

    public genId() {
        return uuid();
    }
    public genUser(username: string, password: string) {
        let salt = this.genSalt();
        let hashpass = this.hashPassword(password, salt);
        return {
            id: uuid(),
            username: username,
            salt: salt,
            hashpass: hashpass
        };
    }

    public hashPassword(password: string, salt: string) {
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        let value = hash.digest('hex');
        return value;
    }

    public genSalt() {
        let salt = crypto.randomBytes(Math.ceil(128))
            .toString('hex')
            .slice(0, 128);
        return salt;
    }

    public getToken(id: string) {
        let payload = {
            id: id,
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
            if (dtoken.id === id)
                return 1;
            else
                return 401;
        } catch (err) {
            return 401;
        }
    }
};

export default new AuthService();