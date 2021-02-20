interface Other {
  sub: string;
  name: string;
  email: string;
  locale: string;
  picture: string;
  given_name: string;
  email_verified: boolean;
}

export interface User {
  id: string;
  profilePicture: string;
  username: string;
  googleId: string;
  googleAccessToken: string;
  googleRefreshToken?: any;
  other: Other;
  tokenVersion: number;
  createdAt: string;
}
