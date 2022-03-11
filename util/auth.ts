import Tokens from 'csrf';

const tokens = new Tokens();

export function createCsrfToken() {
  if (typeof process.env.CSRF_SECRET_SALT === 'undefined') {
    throw new Error('CSRF_SECRET_SALT is not defined');
  }

  // In a more secure system, we would create the token based
  // on NOT ONLY the CSRF_SECRET_SALT (which will not change)
  // but also based on a user identifier
  //
  // An example of a user identifier (if a user is NOT logged
  // in) would be a short-lived (5 minute expiry) session
  return tokens.create(process.env.CSRF_SECRET_SALT);
}

/** Verify that CSRF Token was generated by the CSRF_SECRET_SALT environment variable */
export function verifyCsrfToken(csrfToken: string) {
  if (typeof process.env.CSRF_SECRET_SALT === 'undefined') {
    throw new Error('CSRF_SECRET_SALT is not defined');
  }

  return tokens.verify(process.env.CSRF_SECRET_SALT, csrfToken);
}
