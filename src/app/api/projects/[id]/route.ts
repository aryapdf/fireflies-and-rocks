import { NextRequest } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/db/queries";
import { updateProjectSchema } from "@/lib/validations/portfolio";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/utils/api-response";

export async function GET(request:NextRequest, { params }: { params: { id: string } }) {
    try {
        const project = await getProjectById(params.id);
        return successResponse(project);
    } catch (error:any) {
        console.error("Error fetching project by ID:", error);
        return errorResponse(error.message || "Failed to fetch project");
    }
}

export async function PUT(request:NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const validation:any = updateProjectSchema.safeParse(body);

        if (!validation.success) {
            return validationErrorResponse(validation.error.format());
        }

        const project = await updateProject(params.id, validation.data);
        return successResponse(project);
    } catch (error:any) {
        console.error("Error updating project:", error);
        return errorResponse(error.message || "Failed to update project");
    }
}

export async function DELETE(request:NextRequest, { params }: { params: { id: string } }) {
    try {
        await deleteProject(params.id);
        return successResponse({ message: "Project deleted successfully" });
    } catch (error:any) {
        console.error("Error deleting project:", error);
        return errorResponse(error.message || "Failed to delete project");
    }
}