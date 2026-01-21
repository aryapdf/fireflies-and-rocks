import { errorResponse } from "./api-response";

export function handleApiError(
    error: unknown,
    fallbackMessage = "Internal server error",
    statusCode = 500,
) {
    console.error("API Error:", error);
    const message = error instanceof Error ? error.message : fallbackMessage;
    return errorResponse(message, statusCode);
}
