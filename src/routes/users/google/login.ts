import { Request, Response } from "express";
import { google } from "googleapis";
import { google as googleConfig } from "../../../../config";

export const loginWithGoogle = async (req: Request, res: Response) => {
  const oauth2Client = new google.auth.OAuth2(
    googleConfig.client_id,
    googleConfig.client_secret,
    googleConfig.redirect_uri
  );

  // console.log(googleConfig.redirect_uri)
  // const state = generateRandomState();

  const url = oauth2Client.generateAuthUrl({
    access_type: "online",
    scope: ["https://www.googleapis.com/auth/userinfo.email"],
    // state,
    
  });

  res.redirect(url);
}

export default loginWithGoogle