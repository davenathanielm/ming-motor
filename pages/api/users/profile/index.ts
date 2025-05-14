import { withAuth } from "../../../../middleware/verifyToken";

export default withAuth(async (req, res) => {
  const user = (req as any).user;
  return res.status(200).json({ success: true, user });
});
