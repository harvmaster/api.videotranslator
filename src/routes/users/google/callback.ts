import { Request, Response } from "express";
import { google } from "googleapis";
import { google as googleConfig } from "../../../../config";

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

  res.json(data);
}

export default loginWithGoogleCallback