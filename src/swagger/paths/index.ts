import AuthPaths from './auth.path';
import UserPaths from './users.path';
const paths: any = {};
AuthPaths.forEach((path) => (paths[path.path] = path.object));
UserPaths.forEach((user) => (paths[user.path] = user.object));
export default paths;
