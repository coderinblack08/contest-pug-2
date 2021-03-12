import * as Yup from "yup";

export const contestSchema = Yup.object({
  name: Yup.string().min(2).max(25).required(),
  website: Yup.string().url().max(255),
  email: Yup.string().email().max(255),
  description: Yup.string().min(20).max(10000).required(),
  instruction: Yup.string().max(255),
});
