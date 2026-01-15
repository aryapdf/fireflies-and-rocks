import { NextRequest } from "next/server";
import { getProjects, createProject, getProjectById, updateProject, deleteProject } from "@/lib/db/queries";
import { projectSchema, updateProjectSchema } from "@/lib/validations/portfolio";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/utils/api-response";

export async function GET(request:NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const featured = searchParams.get("featured");
        const projectId = searchParams.get("projectId");

        if (projectId) {
            const project = await getProjectById(projectId)
            return successResponse(project)
        }

        let featuredFilter: boolean | undefined;

        if (featured === 'true') {
            featuredFilter = true;
        } else if (featured === 'false') {
            featuredFilter = false;
        }

        const projects = await getProjects(featuredFilter);
        return successResponse(projects);
    } catch (error:any) {
        console.error("Error fetching projects:", error);
        return errorResponse(error.message || "Failed to fetch projects");
    }
}

export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const validation:any = projectSchema.safeParse(body);

        if (!validation.success) {
            return validationErrorResponse(validation.error.format());
        }
        
        const project = await createProject(validation.data)
        return successResponse(project, 201)
    } catch (error:any) {
        console.error("Error creating any project", error)
        return errorResponse(error.message || "Failed creating any project");
    }
}

export async function PUT(request:NextRequest) {
    try {
        const body = await request.json();
        const validation:any = updateProjectSchema.safeParse(body)
        const searchParams = request.nextUrl.searchParams;

        if (!validation.success) {
            return validationErrorResponse(validation.error.format())
        }
        
        const projectId = searchParams.get("projectId");

        if (!projectId) {
            throw new Error("Project ID is required.")
        }

        const project = await updateProject(projectId, validation.data)
        return successResponse(project);
    } catch (error:any) {
        console.error("Error updating any project", error)
        return errorResponse(error.message || "Failed creating any project");
    }
}

export async function DELETE(request:NextRequest){
    try {
        const searchParams = request.nextUrl.searchParams;
        const projectId:any = searchParams.get("projectId")
        await deleteProject(projectId)
        return successResponse({ message: "Project deleted successfully" })
    } catch (error:any) {
        console.error("Error deleting any project", error)
        return errorResponse(error.message || "Failed to delete project")
    }
}