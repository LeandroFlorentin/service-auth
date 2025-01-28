import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const getToken = (data: any): string => jwt.sign({ data }, JWT_SECRET as string, { expiresIn: '1h' });
