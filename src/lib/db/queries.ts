import { supabase } from "@/lib/supabase";
import type { Profile, Project, Experience, Skill } from "@/lib/types/database";

// PROFILES

export async function getProfile() {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single()
    
    if (error) {
        throw new Error(`Failed to fetch profile, Err : ${error.message}`)
    }

    return data as Profile;
}

// PROJECTS

export async function getProjects(featured?: boolean) {
  let query = supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });

  if (featured !== undefined) {
    query = query.eq("featured", featured);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data as Project[];
}

export async function getProjectById(id: String) {
    let {data, error} = supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single()
    
    if (error) throw new Error(`Failed to fetch project: ${error.message}`);
    return data as Project;
}


export async function createProject(project: Omit<Project, "id" | "created_at">) {
    const { data, error } = supabase
        .from("projects")
        .insert(project)
        .select()
        .single()

    if (error) throw new Error(`Failed to create new project: ${error.message}`);
    return data as Project;
}

export async function updateProject(id: string, updates: Partial<Omit<Project, "id">>){
    const { data, error } = supabase 
        .from("projects")
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(`Failed to update project: ${error.message}`);
    return data as Project;
}

export async function deleteProject(id:string) {
    const {error} = supabase
        .from("projects")
        .delete()
        .eq("id", id)
        
    if (error) throw new Error(`Failed to delete project: ${error.message}`);
    return { success: true };
}

// EXPERIENCES

