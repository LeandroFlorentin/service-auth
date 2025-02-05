export const getBearerToken = (token: string = ''): string => token?.split(' ')[1];
