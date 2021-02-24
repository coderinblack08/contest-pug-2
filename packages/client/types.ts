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

export type FormQuestion = {
  question: string;
  type:
    | "text"
    | "number"
    | "datetime-local"
    | "date"
    | "time"
    | "checkbox"
    | "telephone";
  required: boolean;
};

export interface FormikContest {
  name: string;
  website?: string;
  email?: string;
  description: string;
  instructions?: string;
  form: FormQuestion[];
}

export interface Contest extends FormikContest {
  id: string;
  competitors: number;
  creatorId: string;
  updatedAt: Date;
  createdAt: Date;
}

export type FetchedContest = Contest & { isCreator: boolean; joined: boolean };
