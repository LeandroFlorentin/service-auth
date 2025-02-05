import { RequestWhenAuth, Response, NextFunction } from '../types/express.types';
import { getBearerToken } from '../utils/functions';
import { decodedToken } from '../utils/jwt';
import { responseStructure } from '../utils/response';

export function middlewareDecoded(req: RequestWhenAuth, res: Response, next: NextFunction): any {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json(responseStructure(401, 'Token not send', {}));
    const bearerToken = getBearerToken(authHeader);
    const decoded = decodedToken(bearerToken);
    next();
  } catch (error) {
    console.log('ERROR', error);
    next(error);
  }
}
