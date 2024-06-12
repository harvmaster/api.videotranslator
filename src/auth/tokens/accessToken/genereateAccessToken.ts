import jwt from 'jsonwebtoken';
import { jwt as jwt_config } from '../../../../config'

const jwt_secret = jwt_config.secret

export const generateAccessToken = (user: string): string => {
  const jwtOptions = {
    expiresIn : '7d',
  }
  const jwtPayload = {
    id: user,
  }

  if (!jwt_secret) throw new Error('JWT secret is not defined')

  const token = jwt.sign(jwtPayload, jwt_secret, jwtOptions)
  return token
}

export default generateAccessToken