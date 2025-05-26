import jwt from 'jsonwebtoken';
import { IDataToken } from '../interfaces/utils';
const { JWT_SECRET } = process.env;

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET as string);

export const getToken = (data: IDataToken): string => jwt.sign({ data }, JWT_SECRET as string, { expiresIn: '1h' });

export const decodedToken = (token: string): any => jwt.verify(token, JWT_SECRET as string);
