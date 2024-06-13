# API.VideoTranslator
An ExpressJS REST API for [Angular.VideoTranslator](https://github.com/harvmaster/angular.videotranslator) implementing local user authentication as well as Google oAuth integration, a video upload route, and a video player route.

The DB is a PostgreSQL is interfaced with using Prisma.

# Config
```
DATABASE_URL="postgresql://user:password@host/route?schema=public"

GOOGLE_CLIENT_ID="google oAuth Client Id"
GOOGLE_CLIENT_SECRET="google oAuth secret"
GOOGLE_REDIRECT_URI="Redirect URI of server for after google auth"

JWT_SECRET="secret"

FRONTEND_URL="Base_URL of Frontend to redirect back to after google auth"
```

