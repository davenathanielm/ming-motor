import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signToken = (payload: object, expiresIn = "15m") => 
{
  // @ts-ignore
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

// information 
// 1. JWT_SECRET is a secret key used to sign the JWT token. It should be kept secret and not exposed to the client or anyone else.
// 2. The signToken function takes a payload and an optional expiresIn parameter. The payload is the data that will be included in the token, and expiresIn is the duration for which the token is valid. The default value for expiresIn is "15m", which means the token will expire in 15 minutes. You can change this value to any valid duration string supported by the jsonwebtoken library (e.g., "1h", "2d", etc.).
// 3. This payolad is the object or data that include in token usually {id, username, email, role, etc.}
// 4. The verifyToken function takes a token as an argument and verifies it using the same secret key. If the token is valid, it returns the decoded payload. If the token is invalid or expired, it throws an error.

// the summary of this function is :
// 1. JWT_Secret contain secret key to sign the jwt token
// 2. signToken function is used to sign the token with payload and expiration time, this payload create jwt token that contain user information in payload
// 3. verifyToken function is used for assign new token to user that attached with jwt secret so when use access to token they wil get the jwt secret and payload that contain user information
//  verifyToken also used for protected routes access like dashboard, stockpage also You can then attach this to req.user and know who is accessing the route.

