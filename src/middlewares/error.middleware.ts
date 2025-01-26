import { ErrorRequestHandler } from '../types/express.types';
import { errorStructure } from '../utils/error';
export const middlewareError: ErrorRequestHandler = (err, req, res, next): void => {
  if (err) {
    const [firstError] = err.errors;
    const error = errorStructure(500, firstError.message, err.name);
    res.status(500).json(error);
    return;
  }
  next();
};
