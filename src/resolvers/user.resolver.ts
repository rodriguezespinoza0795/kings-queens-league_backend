import type { PrismaClient, User } from '@prisma/client'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { Resend } from 'resend';

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient }

const resend = new Resend(process.env.EMAIL_API);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'nunca pares de aprender'

const sendCode = async (email: string, code:number) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Code validation',
      html: `<strong>Code Verification: ${code}</strong>`,
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<User, 'username' | 'email' | 'password' >
  },
  { orm }: ResolverContext
): Promise<User> {
  const { username, email, password } = data
  let today = new Date()
  const hashedPassword = await hash(password as string, 10)
  const code = Math.floor(100000 + Math.random() * 900000)
  const newEmail = email.trim().toLowerCase();
  const user = await orm.user.create({
    data: {
      username: username.trim().toLowerCase(),
      email: newEmail,
      password: hashedPassword,
      code: code,
      codeEffectiveDate: new Date(today.getTime() + (20 * 60 * 1000))
    },
  })

  sendCode(newEmail, code)
  
  return user
}

export async function signIn(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<User, 'email' | 'password' >
  },
  { orm }: ResolverContext
): Promise<any> {
  const { email, password } = data
     
  const user = await orm.user.findUnique({where:{email: email}})
  if (!user) throw new Error('USER_NOT_FOUND')

  const isValid = await compare(password, user.password)

  if (!isValid) throw new Error('WRONG_PASSWORD')

  if (!user.verified) throw new Error('EMAIL_NOT_VERIFIED')
    
  const token = sign(
    { userId: user.id },
    JWT_SECRET_KEY,
    { expiresIn: '2h' }
  );

  return { token };
 
}


export async function validateEmail(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<User, 'email' | 'code' >
  },
  { orm }: ResolverContext
): Promise<any> {
  const { email, code } = data
     
  const user = await orm.user.findUnique({where:{email: email}})
  if (!user) throw new Error('USER_NOT_FOUND')

  if (user.code !== code) throw new Error('WRONG_CODE')

  const userVerified = await orm.user.update({
    where: {email: email},
    data: {
      verified:true
    }
  })

return userVerified 
}