import { Request, Response } from "express";

import prisma from "../../services/prisma";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: String(id),
    },
  });

  res.json(user);
}

export default getUser;