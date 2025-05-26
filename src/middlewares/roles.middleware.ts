import { Request, Response, NextFunction } from '../interfaces/express.types';
import { responseStructure } from '../utils/response';

export function middlewareRoleAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const { role } = req.user!;
    if (role.includes('ADMIN')) return next();
    const msg = 'Access denied. You do not have sufficient permissions to access this resource.';
    return res.status(403).json(responseStructure(403, msg, { ...req.user }));
  } catch (error) {
    next(error);
  }
}

export function middlewareVerifyRoleUpdated(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json(responseStructure(404, 'Not send id in query params', {}));
    const { role, id: iduser } = req.user!;
    if (role.includes('ADMIN')) return next();
    if (role.includes('USER')) {
      if (Number(id) === iduser) return next();
      return res.status(403).json(responseStructure(403, 'You can only modify your user, because of your permissions', { ...req.user }));
    }
  } catch (error) {
    next(error);
  }
}
