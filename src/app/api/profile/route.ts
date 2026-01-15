import { NextRequest } from "next/server";
import { getProfileById, getProfiles, updateProfile } from "@/lib/db/queries"
import { updateProfileSchema } from "@/lib/validations/portfolio";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/utils/api-response";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const userId = searchParams.get("userId");

        if (userId) {
            const profile = await getProfileById(userId);
            return successResponse(profile);
        } 

        const profiles = await getProfiles();
        return successResponse(profiles);
    } catch (e: any) {
        console.error("Error fetching profiles :", e);
        return errorResponse(e.message || "Failed to fetch profiles")
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) return errorResponse("Profile ID is required.", 400)

        const validation:any = updateProfileSchema.safeParse(updates)
        if (!validation.success) {
            return validationErrorResponse(validation.error.format());
        }

        const profile = await updateProfile(id, validation.data)
        return successResponse(profile)

    } catch (e:any) {
        console.error('Error updating profile :', e);
        return errorResponse(e.message || "Failed to update profile.")
    }
}