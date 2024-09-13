import cleint from '@rinshadp014/db/client'
import { hashPassword } from '../app/lib/hashPassword';

type createUserPayload = {
  userName: string;
  password: string;
}

const createUser = async ({ userName, password }: createUserPayload) => {

  password = await hashPassword(password)
  const user = cleint.user.create({
    data: {
      number: userName,
      password: password
    }
  })

  return user
}

export default createUser
