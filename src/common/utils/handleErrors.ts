import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorToast } from "./errorToast";

type ErrorResponse = {
  status_message?: string;
};

export const handleErrors = (error: FetchBaseQueryError) => {
  const getMessage = () => {
    if (
      "data" in error &&
      error.data &&
      typeof error.data === "object" &&
      "status_message" in error.data
    ) {
      return (error.data as ErrorResponse).status_message;
    }

    return null;
  };

  if (error) {
    switch (error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
      case "TIMEOUT_ERROR":
        errorToast(error.error);
        break;

      case 401:
        errorToast("Invalid API key. Check your environment variables.");
        break;

      case 404:
        errorToast(getMessage() || "Requested resource was not found.");
        break;

      case 429:
        errorToast(
          getMessage() || "Too many requests. Please try again later.",
        );
        break;

      default:
        if (typeof error.status === "number") {
          if (error.status >= 500) {
            errorToast("Server error occurred. Please try again later.");
          } else {
            errorToast(getMessage() || "Something went wrong.");
          }
        } else {
          errorToast("Unexpected error occurred.");
        }
    }
  }
};
