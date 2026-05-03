import { ZodType } from "zod";
import { errorToast } from "./errorToast";

export const withZodCatch =
  <T>(schema: ZodType<T>) =>
  (response: unknown): T => {
    const result = schema.safeParse(response);

    if (!result.success) {
      console.error("Schema validation error:", result.error);

      errorToast("Response validation failed");

      throw new Error("Invalid API response");
    }

    return result.data;
  };
