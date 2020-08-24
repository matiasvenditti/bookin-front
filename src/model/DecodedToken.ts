/**
 * All constants are useful data of the user
 * @constant { string[] } authorities roles
 * @constant { number } exp expiration date in millisecondsexport default 
 * @constant { string } sub email
 */
export interface DecodedToken {
    authorities: string[],
    exp: number,
    sub: string,
}