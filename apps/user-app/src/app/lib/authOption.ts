import db from "@rinshadp014/db/client"

import { hashPassword, verifyPassword } from "./hashPassword"
import CredentialsProvider from "next-auth/providers/credentials"
import CredentialsType from "../types/authOption"
import { findUnique } from "../dbQuery/findUnique"


export const authOption = {
  provider: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Phone Number", type: "text", placeholder: "jsmith", require },
        password: { label: "Password", type: "password", require }
      },
      //here i want to find the type of the credentials but couldn't 
      async authorize(credentials: CredentialsType, req) {
        if (credentials?.username || credentials?.password) {
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
          }
          return null
        }
      }
    })
  ]
}


