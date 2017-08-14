import * as crypto from 'crypto';
import * as uuid from 'uuid/v4';
import AppSecrets from '../app.secrets';
class CryptService {
    algorithm = 'aes-256-ctr';
    password = AppSecrets.crypt_secret;
    encrypt(text) {
        var cipher = crypto.createCipher(this.algorithm, this.password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    decrypt(text) {
        try {
            var decipher = crypto.createDecipher(this.algorithm, this.password)
            var dec = decipher.update(text, 'hex', 'utf8')
            dec += decipher.final('utf8');
            return dec;
        }
        catch (err) {
            return null; 
        }
        
    }

    public genId() {
        return uuid();
    }

    public sign() {

    }

    public hash(string1: string, string2: string = this.password, encoding:"latin1" | "hex" | "base64" = "base64") {
        let hash = crypto.createHmac('sha512', string2);
        hash.update(string1);
        let value = hash.digest(encoding);
        return value;
    }

    public genSalt(encoding = "base64") {
        let salt = crypto.randomBytes(Math.ceil(128))
            .toString(encoding)
            .slice(0, 128);
        return salt;
    }
}

export default new CryptService();