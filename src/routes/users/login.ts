import { Request, Response } from "express";
import prisma from "../../services/prisma";

import { validatePassword } from "../../auth/local";
import generateAccessToken from "../../auth/tokens/accessToken/genereateAccessToken";
import { AuthenticatedUser } from "../../types";

export const login = async (req: Request, res: Response<AuthenticatedUser>) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  if (!user.password || !user.salt) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isValidPassword = validatePassword(password, user.salt, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const accessToken = generateAccessToken(user.id);

  res.json({
    id: user.id,
    email: user.email,
    auth: {
      accessToken: accessToken,
    }
  });
};

export default login;
