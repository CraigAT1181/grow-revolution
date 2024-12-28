import { useCallback } from "react";

export default function useErrorHandler() {
  const handleError = useCallback((error) => {
    console.error("[Error]", error.message || error);
    alert(error.message || "Oops, something went wrong!");
  }, []);

  return handleError;
}
