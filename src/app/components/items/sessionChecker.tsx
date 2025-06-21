import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export const SessionChecker = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      const checkExpiry = () => {
        const now = new Date();
        const expiryDate = new Date(session.expires);
        const isExpired = now > expiryDate; 

        console.log("Now:", now.toISOString());
        console.log("Session expires:", expiryDate.toISOString());
        console.log("Is token expired?", isExpired);

        if (isExpired) {
          console.log("Token is expired. Logging out...");
          signOut({ callbackUrl: "/auth/login" });
        }
      };

      // Run once immediately
      checkExpiry();

      // Optionally run every minute
      const interval = setInterval(checkExpiry, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [session, status]);

  return null; // or display something useful
};
