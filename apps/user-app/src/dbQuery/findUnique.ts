import client from "@rinshadp014/db/client"

export const findUnique = async (username: string) => {

  let user = await client.user.findUnique({
    where: {
      number: username
    },
  })

  return user


}
