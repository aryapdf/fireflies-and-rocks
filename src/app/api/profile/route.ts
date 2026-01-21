import { NextRequest } from "next/server";
import { getProfileById, getProfiles, updateProfile } from "@/lib/db/queries";
import { updateProfileSchema } from "@/lib/validations/portfolio";
import {
    successResponse,
    errorResponse,
    validationErrorResponse,
} from "@/lib/utils/api-response";
import { handleApiError } from "@/lib/utils/handle-api-error";

export async function GET(request: NextRequest) {
    try {
        // /api/profile?userId=xxx  -> single
        // /api/profile             -> list

        const { searchParams } = request.nextUrl;
        const userId = searchParams.get("userId");

        if (userId) {
            const profile = await getProfileById(userId);
            if (!profile) return errorResponse("Profile not found.", 404);
            return successResponse(profile);
        }

        const profiles = await getProfiles();
        return successResponse(profiles);
    } catch (e) {
        return handleApiError(e, "Failed to fetch profiles", 500);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) return errorResponse("Profile ID is required.", 400);

        const validation = updateProfileSchema.strict().safeParse(updates);
        if (!validation.success) {
            return validationErrorResponse(validation.error.flatten);
        }

        const profile = await updateProfile(id, validation.data);
        if (!profile) return errorResponse("Profile not found.", 404);

        return successResponse(profile);
    } catch (e) {
        return handleApiError(e, "Failed to update profile", 500);
    }
}
