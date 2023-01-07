import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

interface IPem {
  [key: string]: string | undefined;
}

interface IKey {
  alg: 'RS256';
  e: string;
  kid: string;
  kty: 'RSA';
  n: string;
  use: string;
}

export interface IPayload {
  'at_hash': string;
  sub: string;
  'cognito:groups': string[];
  'email_verified': boolean;
  iss: string;
  'cognito:username': string;
  aud: string;
  'token_use': string;
  'auth_time': number;
  name: string;
  exp: number;
  iat: number;
  email: string;
}

class CognitoService {
  static async validateToken(token: string): Promise<IPayload | undefined> {
    try {
      const url = process.env.COGNITO_URL || '';
      if (!url.length) throw new Error('Cognito URL not found');
      const response = await axios.get(url);
      const pems: IPem = {};
      const { keys } = response.data;

      keys.forEach((key: IKey) => {
        pems[key.kid] = jwkToPem({ kty: key.kty, n: key.n, e: key.e });
      });

      const decodedJwt: any = jwt.decode(token, { complete: true });

      if (!decodedJwt) {
        return null;
      }

      const { kid } = decodedJwt.header;
      const pem = pems[kid];

      if (!pem) {
        return null;
      }

      try {
        const payload: any = jwt.verify(token, pem);
        return payload;
      } catch (err) {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}

export default CognitoService;
