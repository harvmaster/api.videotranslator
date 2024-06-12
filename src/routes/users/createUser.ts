import { Request, Response } from 'express';

import prisma from '../../services/prisma';
import { createPassword } from '../../auth/local';
import generateAccessToken from '../../auth/tokens/accessToken/genereateAccessToken';
import { AuthenticatedUser } from '../../types';


export const createUser = async (req: Request, res: Response<AuthenticatedUser>) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = createPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      salt: hashedPassword.salt,
      password: hashedPassword.hash,
    },
  });
  
  const accessToken = generateAccessToken(user.id);

  const result = { 
    id: user.id,
    email: user.email,
    auth: {
      accessToken: accessToken,
    }
  }


  res.json(result);
};

export default createUser;