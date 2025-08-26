import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { verifyToken } from "./auth"; // your jwt verify function

// this interface for copy paste NextApiRequest and manipulate by add value user
export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: {
    id: string;
    username?: string;
    role?: string;
    [key: string]: any;
  };
}

// this tell typescript that the funcction will be fill with req and res
export function withAuth(handler: NextApiHandler) {
  
  // return function that NextJS actually run
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    let id_user: string | undefined;

    // 1️⃣ Check for Bearer token first
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = verifyToken(token);
        id_user = decoded.id;
        req.user = decoded; // attach decoded payload
      } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
      }
    }

    // 2️⃣ If no token, fallback to NextAuth session
    if (!id_user) {
      const session = await getServerSession(req, res, authOptions);
      if (session?.user?.id) {
        id_user = session.user.id as string;
        req.user = session.user;
      }
    }

    // 3️⃣ Final check
    if (!id_user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Pass control to the actual API handler or run supplierHandler if successfull token or cookies check
    return handler(req, res);
  };
}

// the flow will be :
// 1. it called withAuth first because withAuth wrap these supplierHandler
// 2. after that in withAuth there is filter and checking for token or session
// 3. if successfull it will run supplierHandler with req and res that already modified in withAuth
