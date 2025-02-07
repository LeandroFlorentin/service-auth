import { ErrorRequestHandler } from '../types/express.types';
import { responseStructure } from '../utils/response';
export const middlewareError: ErrorRequestHandler = (err, req, res, next): void => {
  console.log('MIDDLEERR', err.errors);
  if (err.errors) {
    const [firstError] = err.errors;
    const error = responseStructure(500, firstError.message, { ...firstError });
    res.status(500).json(error);
    return;
  }
  if (err.type === 'jwt') {
    res.status(err.status).json(responseStructure(err.status, err.data.message, { ...err.data }));
    return;
  }
  next();
};
