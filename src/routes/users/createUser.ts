import { Request, Response } from 'express';

import prisma from '../../services/prisma';
import { createPassword } from '../../auth/local';


export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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


  res.json(user);
};