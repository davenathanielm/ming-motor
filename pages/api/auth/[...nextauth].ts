import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkUsernameService } from "../../../services/userService";
import { comparePassword } from "../../../lib/auth/hash";
import { User } from "../../../models/userModel/userModel";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials", // optional later it will  be used iin login ui for sign in
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userResult = await checkUsernameService(credentials?.username || "");

        if (!userResult.success) return null;
        const user = userResult.data;
        console.log("authorize received user:", user);

        const isValid = await comparePassword(credentials?.password || "", user?.password || "");
        if (!isValid) return null;

        return {
          id: user?.id_user || "",
          username: user?.username || "",
          fullName: user?.fullName || "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge : 60 *60 *2, // 2 hours
  },
  callbacks: {
    async jwt({ token, user } :{ token: any; user: any }) {
      if (user) {
        console.log("JWT received user:", user);
        token.id = user.id;
        token.username = user.username;
        token.fullName = user.fullName
      }
      return token;
    },
    async session({ session, token } : { session: any; token: any }) {
      session.user = {
        id: token.id,
        username: token.username,
        fullName: token.fullName,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

// How this works
// 1. flow will be provider -> authorize -> checkUsernameService ->comparePassword-> 
//    session -> createjwt-> callsback -> insert service response data to jw -> insert jwt data to session ->ready to use in client side

// Definition
// 1. CredentialProvider: is a provider that allows you to use any authentication method you want, such as username and password, or any other custom method so it can have more than 1 providers.
// 2. Because you can have 2 providers or more thats why use name ="Credentials" to help define credential in signIn that used it in login.page ui
//  - these name actually nly helping in front because nextAuth actually only recgonize by id and in credentialsProvider already automatic generate id "credentials" but 
//  - if using another provider like google,github,etc need to use name and id to differentiate between providers like client id and client secret in google provider
// 3. authorize is function that checked username and password in backend using service api if return null it will automatic return response 401 in client side and redirect to login page
//  - if authorize return true it will create jwt token and insert response data from username to token
//  - but after save to token we want it to call in session to use in UI so data in token will be inserted to session and can be used in client side
// 4. secret must be same with NEXTAUTH_SECRET in .env.local file and this secret is used to encrypt the JWT token so it can be decoded in client side

