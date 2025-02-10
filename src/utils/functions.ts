export const getBearerToken = (token: string = ''): string => token?.split(' ')[1];

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,30}$/;

export const verifyEmail = (email: string): boolean => regexEmail.test(email);

export const verifyPassword = (password: string): boolean => regexPassword.test(password);
