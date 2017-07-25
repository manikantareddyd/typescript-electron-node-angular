import * as crypto from 'crypto';
import * as uuid from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import AuthSecrets from './auth.secrets';
import Users from '../db/pppp/users'
class AuthService {
    public validatePassword(user, password) {
        let salt = user.salt;
        let hashpass = this.hashPassword(password, salt);
        return (hashpass === user.hashpass);
    }

    public genUser(username: string, password: string){
        let salt = this.genSalt();
        let hashpass = this.hashPassword(password, salt);
        return {
            _id: uuid(),
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

    public getToken(id: string){
        let payload = {
            id: id,
        };
        let token = jwt.sign(
            payload,
            AuthSecrets.jwt.secret
        );
        return token;
    }
};

export default new AuthService();