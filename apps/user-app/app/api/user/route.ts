import db from "@repo/db/cleint";
import { NextResponse } from "next/server";


export const GET = async () => {
  await db.user.create({
    data: {
      name: 'rinshad',
      email: 'rinshadp@gmail.com'
    }
  })

  NextResponse.json({
    message: "hello there"
  },
    { status: 200 }
  )
}
