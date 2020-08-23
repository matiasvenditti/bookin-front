/**
 * All constants are useful data of the user
 * @constant { string[] } authorities roles
 * @constant { number } exp expiration date in milliseconds
 * @constant { string } sub email
 */
export interface DecodedToken {
    authorities: string[],
    exp: number,
    sub: string,
}