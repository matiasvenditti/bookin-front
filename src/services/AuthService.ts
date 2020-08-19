/**
 * @return { boolean }
 */
const isLoggedIn = function(): boolean {
    const token = localStorage.getItem('token');
    return true;
};

/**
 * @return { boolean }
 */
const isAuthorized = function(requiredRoles: string[]) {
    const token = localStorage.getItem('token');
    const userRoles: string[] = []; // get from token
    requiredRoles.every(role => userRoles.includes(role));
    return true;
};

export {
    isLoggedIn,
    isAuthorized,
}
