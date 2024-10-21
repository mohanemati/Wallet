import { z } from "zod";
import {
  invalidEmailMessage,
  requiredMessage,
  tooBigMessage,
  tooSmallMessage,
} from "./validationCustomMessages";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  console.log("ctx", ctx);
  console.log("issue", issue);
  if (ctx.data === "") return { message: requiredMessage };
  if (ctx.data === undefined) return { message: requiredMessage };

  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      return { message: tooSmallMessage(issue.minimum) };

    case z.ZodIssueCode.too_big:
      return { message: tooBigMessage(issue.maximum) };

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") return { message: invalidEmailMessage };
      return { message: ctx.defaultError };

    case z.ZodIssueCode.invalid_type:
      if (issue.expected === "object" && issue.received === "null")
        return { message: requiredMessage };
      return { message: ctx.defaultError };

    default:
      return { message: ctx.defaultError };
  }
};

z.setErrorMap(customErrorMap);

export default z;
