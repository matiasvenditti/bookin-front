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
const isAuthorized = function(userRoles: string[], requiredRoles: string[]) {
    return true;
};

export {
    isLoggedIn,
    isAuthorized,
}
