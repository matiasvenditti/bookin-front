import jwt_decode from 'jwt-decode';

/**
 * @return { boolean }
 */
// TODO unify isLoggedIn y validateToken
const isLoggedIn = function(): boolean {
    const token = localStorage.getItem('token');
    const decoded: any = token !== null && jwt_decode(token);
    return token !== null;
};

/**
 * @return { boolean }
 */
const isAuthorized = function(requiredRoles: string[]) {
    const token = localStorage.getItem('token');
    const userRoles: string[] = []; // get from token
    return requiredRoles.every(role => userRoles.includes(role));
};

const validateToken = () => {
    const token = localStorage.getItem('token');
    const decoded: any = token !== null && jwt_decode(token);
    // const token = response.headers["authorization"].split(' ')[1];
    console.log('validateToken', decoded);
};


export {
    isLoggedIn,
    isAuthorized,
    validateToken
}
