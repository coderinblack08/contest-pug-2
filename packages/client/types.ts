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

export interface FormikContest {
  name: string;
  website?: string;
  email?: string;
  description: string;
  instruction?: string;
  form: {
    question: string;
    type:
      | "text"
      | "number"
      | "datetime"
      | "date"
      | "time"
      | "checkbox"
      | "telephone";
    required: boolean;
  }[];
}

export interface Contest extends FormikContest {
  id: string;
  competitors: number;
  creatorId: string;
  updatedAt: Date;
  createdAt: Date;
}
