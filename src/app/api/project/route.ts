import { NextRequest } from "next/server";
import { getProjects, createProject } from "@/lib/db/queries";
import { projectSchema } from "@/lib/validations/portfolio";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/utils/api-response";

export async function GET(request:NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const featured = searchParams.get("featured");

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