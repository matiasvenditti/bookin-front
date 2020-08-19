const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
}

/**
 * @return { string[] }
 */
const getUserRoles = function(): string[] {
    return Object.values(ROLES);
};

export {
    ROLES,
    getUserRoles,
}