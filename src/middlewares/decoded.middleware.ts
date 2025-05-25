import { RequestWhenAuth, Response, NextFunction } from '../types/express.types';
import { getBearerToken } from '../utils/functions';
import { decodedToken, verifyToken } from '../utils/jwt';
import { responseStructure } from '../utils/response';

export function middlewareDecoded(req: RequestWhenAuth, res: Response, next: NextFunction): any {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json(responseStructure(401, 'Token not send', {}));
    const bearerToken = getBearerToken(authHeader);
    verifyToken(bearerToken);
    const decoded = decodedToken(bearerToken);
    req.user = decoded.data;
    next();
  } catch (error: any) {
    const errorObj = { data: error, type: 'jwt', status: 401 };
    next(errorObj);
  }
}
