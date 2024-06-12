import { Request } from 'express';

export type AuthenticatedUserRequest = Request & { user: string };

export type ServerErrorResponse = {
  error: string;
}

export type ServerResponse<T> = T | ServerErrorResponse;

export type AuthenticatedUser = ServerResponse<{
  id: string;
  email: string;
  auth: {
    accessToken: string;
  };
}>;