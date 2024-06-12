import { Request, Response } from "express";
import { google } from "googleapis";

import { google as googleConfig, frontend } from "../../../../config";

import prisma from "../../../services/prisma";
import generateAccessToken from "../../../auth/tokens/accessToken/genereateAccessToken";

export const loginWithGoogleCallback = async (req: Request, res: Response) => {
  const oauth2Client = new google.auth.OAuth2(
    googleConfig.client_id,
    googleConfig.client_secret,
    googleConfig.redirect_uri
  );

  const { code } = req.query;
  // console.log(code)

  const { tokens } = await oauth2Client.getToken(code as string);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data.email) {
    return res.status(401).json({ error: "Invalid email" });
  }

  let user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: data.email,
        googleId: data.id,
      },
    });
  }

  const accessToken = generateAccessToken(user.id);

  res.redirect(frontend.url + "/login?accessToken=" + accessToken);
}



export default loginWithGoogleCallback