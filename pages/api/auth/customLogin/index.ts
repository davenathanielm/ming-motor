import { NextApiRequest, NextApiResponse } from "next";
import { comparePassword } from "../../../../lib/auth/hash";
import { checkUsernameService } from "../../../../services/userService";
import { signToken } from "../../../../lib/auth/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  const userResult = await checkUsernameService(username);

  if (!userResult.success) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const user = userResult.data;

  const isValid = await comparePassword(password, user?.password || "");

  if (!isValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = signToken({
    id: user?.id_user,
    username: user?.username,
    fullName: user?.fullName,
    role: user?.role,
  });

  // If we reach this point, the user is authenticated
  // You can create a session or JWT token here

  return res.status(200).json({ message: "Login successful", token });
}
