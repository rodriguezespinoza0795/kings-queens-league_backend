import { verify } from 'jsonwebtoken';
import type { Request, RequestHandler } from 'express'

declare global {
    namespace Express {
      interface User {
        id: number
      }
      interface Request {
        user?: Express.User
      }
    }
  }

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'nunca pares de aprender';

interface UserJwtPayload {
    userId: number // The user Id
    iat: number // Issued at
    exp: number // Expire time
  }

export const verifyToken = async (req: Request) => {
    const { authorization } = req.headers
    const token = (authorization || '').replace('Bearer ', '')
  
    try {
        
      const verified = await verify(
        token,
        new TextEncoder().encode(JWT_SECRET_KEY)
      )
  
      return verified as unknown as UserJwtPayload
    } catch (e) {
      throw new Error('Invalid token')
    }
  }

const authMiddleware: RequestHandler = async (req, res, next) => {
    try {
      const payload = await verifyToken(req)
      req.user = { id: payload.userId }
    } catch (e) {
      // ignore
    } finally {
      next()
    }
  }
  
  export default authMiddleware