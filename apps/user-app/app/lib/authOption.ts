import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import findUnique from "../db/query/findUnique";
import { verifyPassword } from "./passwordCrypt";

type CredentialsType = Record<'name' | 'phone' | 'email' | 'password', string> | undefined

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "FirstName", type: "text", placeholder: 'james' },
        phone: { label: "Phone number", type: "text", placeholder: "995109999", require },
        email: { label: "Username", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password", require },
      },
      async authorize(credentials: CredentialsType, req) {

        if (credentials == undefined || !credentials.password || !credentials.phone) {
          return null
        }
        try {
          let existingUser = await findUnique(credentials.phone)

          if (existingUser) {
            let isValidPassword = await verifyPassword(existingUser.password, credentials.password)
            if (isValidPassword) {
              return {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.number
              }
            }
          }
        } catch (e) {
          console.log(e)
          return null
        }

        return null
      }

    }),
  ],
  secret: process.env.JWT_SECRET || "JWT",

  callbacks: {

    async session({ session, token, user }: { session: Session, token: JWT, user: User }): Promise<Session> {
      if (!session) {
        session. = token.sub
      }
      return session
    }
  }
}
export default authOptions
