

export default async function findUnique(phone: string) {
  const user = await db?.user.findUnique({
    where: {
      number: phone
    }
  })
  return user
}
