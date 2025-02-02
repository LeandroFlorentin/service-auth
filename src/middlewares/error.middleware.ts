import { ErrorRequestHandler } from '../types/express.types';
import { responseStructure } from '../utils/response';
export const middlewareError: ErrorRequestHandler = (err, req, res, next): void => {
  if (err) {
    const [firstError] = err.errors;
    const error = responseStructure(500, firstError.message, { ...firstError });
    res.status(500).json(error);
    return;
  }
  next();
};
