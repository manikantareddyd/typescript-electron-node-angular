

import AppSecrets from '../app.secrets';
import { Users } from '../db/models/_';
import { Request, Response } from 'express';
import { TokenService, CryptService } from '../services/_';
class AuthService {
    public validatePassword(user, password) {
        let salt = user.salt;
        let hashpass = CryptService.hash(password, salt);
        return (hashpass === user.hashpass);
    }

    public genUser(username: string, password: string) {
        let salt = CryptService.genSalt();
        let hashpass = CryptService.hash(password, salt);
        return {
            id: CryptService.genId(),
            username: username,
            salt: salt,
            hashpass: hashpass
        };
    }

    

};

export default new AuthService();