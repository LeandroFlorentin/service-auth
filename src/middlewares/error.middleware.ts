import { ErrorRequestHandler } from '../types/express.types';
import { responseStructure } from '../utils/response';
import CustomError from '../utils/customError';
export const middlewareError: ErrorRequestHandler = (err, req, res, next): void => {
  
  if (err instanceof CustomError) {
    res.status(err.status).json(responseStructure(err.status, err.message,{}));
    return;
  }

  if (err?.name?.toLowerCase().includes('sequelize')) {
    if (err.errors?.length) {
      const [firstError] = err.errors;
      const error = responseStructure(500, firstError.message, { ...firstError });
      res.status(500).json(error);
      return;
    } else {
      const { original } = err;
      const error = responseStructure(500, original.detail, { ...original });
      res.status(500).json(error);
    }
  }
  if (err.type === 'jwt') {
    res.status(err.status).json(responseStructure(err.status, err.data.message, { ...err.data }));
    return;
  }
  next();
};
