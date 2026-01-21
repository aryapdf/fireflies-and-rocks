import { NextRequest } from "next/server";
import {
    getSkillById,
    getSkills,
    createSkill,
    updateSkill,
} from "@/lib/db/queries";
import { skillSchema, updateSkillSchema } from "@/lib/validations/portfolio";
import {
    successResponse,
    errorResponse,
    validationErrorResponse,
} from "@/lib/utils/api-response";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");
        const skillId = searchParams.get("id");

        if (skillId) {
            const skill = await getSkillById(skillId);
            return successResponse(skill);
        }

        if (category) {
            const skillByCategory = await getSkills(category);
            return successResponse(skillByCategory);
        }

        const skills = await getSkills();
        return successResponse(skills);
    } catch (error: any) {
        console.log("Failed to fetch skills :", error);
        return errorResponse(error.message || "Failed to fetch skills");
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validation: any = await skillSchema.safeParse(body);
        if (!validation.success) {
            return validationErrorResponse(validation.error.format());
        }

        const skill = await createSkill(validation.data);
        return successResponse(skill, 201);
    } catch (error: any) {
        console.log("Failed create skill :", error);
        return errorResponse(error.message || "Failed to create skill.");
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const searchParams = request.nextUrl.searchParams;
        const skillId = searchParams.get("id");
        const validation: any = updateSkillSchema.safeParse(body);

        if (!validation.success) {
            return validationErrorResponse(validation.error.format());
        }

        if (!skillId) {
            throw new Error("Skill id is required.");
        }

        const skill = await updateSkill(skillId, validation.data);
        return successResponse(skill);
    } catch (error: any) {
        console.log("Failed to update selected skill :", error);
        return errorResponse(error.message || "Falied to update skill");
    }
}
