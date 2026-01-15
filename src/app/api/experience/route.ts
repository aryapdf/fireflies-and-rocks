import { NextRequest } from "next/server";
import { createExperience, getExperiences } from "@/lib/db/queries";
import { experienceSchema } from "@/lib/validations/portfolio";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/utils/api-response";

export async function GET() {
    try {
        const experiences = await getExperiences();
        return successResponse(experiences);
    } catch (error:any) {
        console.error("Error fetching experiences:", error);
        return errorResponse(error.message || "Failed to fetch experiences");
    }
}

export async function POST(request:NextRequest) { 
    try {
        const body = await request.json();
        const validation:any = experienceSchema.safeParse(body);

        if (!validation.success) {
            return validationErrorResponse(validation.error.format());
        }

        const experience = await createExperience(validation.data);
        return successResponse(experience, 201);
    } catch (error:any) {
        console.error("Error creating experience:", error);
        return errorResponse(error.message || "Failed to create experience");
    }
}