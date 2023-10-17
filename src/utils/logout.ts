import decode from 'jwt-decode';

export function getExpirationIfTokenIsValid(token: string | undefined) {
    const decodedToken: { exp: number } | false = token ? decode(token) || false : false;

    if (!decodedToken) return false;

    const oneSecondInMilliseconds = 1000;

    return decodedToken.exp * oneSecondInMilliseconds;
}

export function checkIfTokenIsValid(token: string | undefined) {
    const expiration = getExpirationIfTokenIsValid(token);
    const tokenHasNotExpired = Date.now() <= expiration;

    return tokenHasNotExpired;
}