import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { verifyToken } from "../lib/auth/auth";

export const withAuth = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res : NextApiResponse) =>{
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({ success:false, message: "Unauthorized no token" });
        }

        const token = authHeader.split(" ")[1];
    
        try {
            const decoded =  verifyToken(token); 
            (req as any).user = decoded; // decode so can use data that attach with token
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ success: false, message: "Unauthorized invalid token"});
        }
    }
}

// information
// 1. these withAuth function is a middleware to check token before access another api router
// 2. this function will check if the request has an authorization header and if it starts with Bearer, if not it will return 401 unauthorized
// 3. if the token is valid, it will decode the token and attach the user information to the request object (req.user) so that it can be accessed in the handler function
// need to imply in every api to use this middleware


// new information
// withAuth function: This is a higher-order function that takes an apiHandler function as an argument. It returns a new function that adds authentication logic to the original handler. This is commonly used in middleware-style patterns to check authorization before the main request handler executes.
// handler is the API route handler that will be wrapped by the authentication logic.
// The new function is asynchronous, meaning it can await asynchronous operations, such as token verification.

// Extract Authorization Header: This line extracts the Authorization header from the incoming request. The token that represents the user's authentication is expected to be sent as a Bearer token in this header (e.g., Authorization: Bearer <your-token>).

// const token = authHeader.split(" ")[1]; this means extract token and remove "Bearer" from the string, leaving only the token itself. The split method divides the string into an array based on the space character, and [1] accesses the second element of that array, which is the actual token.
// handler is the API route handler that will be wrapped by the authentication logic.