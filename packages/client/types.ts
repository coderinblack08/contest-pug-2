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
}

export interface Contest extends FormikContest {
  id: string;
  competitors: number;
  creatorId: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Problem {
  id: number;
  rank: string;
  question: string;
  points: number;
  penalty: number;
  type: "text" | "rich_text" | "date" | "checkbox" | "radio";
  choices: { name: string; correct: boolean }[] | null;
  answers: { answer: string; percentage: number }[] | null;
  contestId: string;
}

export type FetchedContest = Contest & { isOwner: boolean; joined: boolean };
