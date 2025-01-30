import AuthPaths from './auth.path';
const paths: any = {};
AuthPaths.forEach((path) => (paths[path.path] = path.object));
export default paths;
