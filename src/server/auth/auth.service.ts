import * as crypto from 'crypto';

class AuthService {
    public validatePassword(user, password) {
        let salt = user.salt;
        let hashpass = this.hashPassword(password, salt);
        return (hashpass === user.hashpass);
    }

    public genHashPass(password: string){
        let salt = this.genSalt();
        let hashpass = this.hashPassword(password, salt);
        return {
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
};

export default new AuthService();