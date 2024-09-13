
import CredentialsProvider from "next-auth/providers/credentials"
import createUser from "../../dbQuery/createUser"
import { findUnique } from "../../dbQuery/findUnique"
import CredentialsType from "../types/authOption"
import { verifyPassword } from "./hashPassword"


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith", require },
        password: { label: "Password", type: "password", }
      },
      async authorize(credentials: any) {
        try {
          let existingUser = await findUnique(credentials?.username)

          if (existingUser) {
            let isValidPassword = await verifyPassword(existingUser.password, credentials?.password)
            if (isValidPassword) {
              return {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
              }
            }
            return null
          }
        } catch (e) {
          console.error(e)
          return null
        }

        try {
          let user = createUser({ password: credentials.password, userName: credentials.username })
          return user
        } catch (e) {
          console.log(e)
          return null
        }

        return null
      },
    })
  ],
  secret: process.env.JWT_SECRET || 'secret',
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    }
  }
}

export default authOptions
