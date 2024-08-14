/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string []}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string []}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authenticaton routes
 * Routes that start with the prefix are used for API authenication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *
 * The default redirect path after loggin in
 *  @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
