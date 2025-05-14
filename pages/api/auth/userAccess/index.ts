import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req : NextApiRequest, res : NextApiResponse) {
  const cookie = req.headers.cookie;
  const cookies = parse(cookie || "");
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const user = verify(token, process.env.JWT_SECRET!);
    return res.status(200).json({ user });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
