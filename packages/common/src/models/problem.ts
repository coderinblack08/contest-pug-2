import * as Yup from "yup";

export const problemSchema = Yup.object({
  contestId: Yup.string().uuid().required(),
  rank: Yup.string(),
  type: Yup.string().oneOf(["text", "rich_text", "date", "checkbox", "radio"]),
  choices: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().max(200).required(),
      correct: Yup.boolean(),
    })
  ),
  points: Yup.number().min(0),
  question: Yup.string(),
});
