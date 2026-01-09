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
  let query = await supabase
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
    let {data, error} = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single()
    
    if (error) throw new Error(`Failed to fetch project: ${error.message}`);
    return data as Project;
}


export async function createProject(project: Omit<Project, "id" | "created_at">) {
    const { data, error } = await supabase
        .from("projects")
        .insert(project)
        .select()
        .single()

    if (error) throw new Error(`Failed to create new project: ${error.message}`);
    return data as Project;
}

export async function updateProject(id: string, updates: Partial<Omit<Project, "id">>){
    const { data, error } = await supabase 
        .from("projects")
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(`Failed to update project: ${error.message}`);
    return data as Project;
}

export async function deleteProject(id:string) {
    const {error} = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        
    if (error) throw new Error(`Failed to delete project: ${error.message}`);
    return { success: true };
}

// EXPERIENCES

export async function getExperiences() {
    const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("start_date", { ascending: false });

    if (error) throw new Error(`Failed to fetch experiences: ${error.message}`);
    return data as Experience[];
}

export async function getExperienceById(id: string) {
    const { data, error } = await supabase
        .from("experiences")
        .select()
        .eq("id", id)
        .single()

    if (error) throw new Error(`Failed to fetch experience: ${error.message}`);
    return data as Experience;
}

export async function createExperience(experience: Omit<Experience, "id" | "created_at">) {
    const { data, error } = await supabase
        .from("experiences")
        .insert(experience)
        .select()
        .single();

    if (error) throw new Error(`Failed to create experience: ${error.message}`);
    return data as Experience;
}

export async function updateExperience(id: string, updates: Partial<Experience>) {
    const { data, error } = await supabase
        .from("experiences")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(`Failed to update experience: ${error.message}`);
    return data as Experience;
}

export async function deleteExperience(id: string){
    const { error } = await supabase
        .from("experience")
        .delete()
        .eq("id", id)

    if (error) throw new Error(`Failed to delete experience: ${error.message}`)
    return { success: true }
}

// SKILLS

export async function getSkills(category?: string) {
    let query = await supabase
        .from("skills")
        .select("*")
        .order("order_index", { ascending: true })
        
    if (category) {
        query = query.eq("category", category)
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch skilss: ${error.message}`);
    return data as Skill[];
}

export async function getSkillById(id: string) {
    const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw new Error(`Failed to fetch skill: ${error.message}`)
    return data as Skill;
}

export async function createSkill(skill: Omit<Skill, "id" | "created_at">) {
    const { data,error } = await supabase
        .from("skills")
        .insert(skill)
        .select()
        .single();

    if (error) throw new Error(`Falied to create skill: ${error.message}`)
    return data as Skill;
}

export async function updateSkill(id: string, updates: Partial<Skill>) {
    const { data, error } = await supabase
        .from("skills")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

    if (error) throw new Error(`Failed to update skill: ${error.message}`);
    return data as Skill;
}

export async function deleteSkill(id: string) {
    const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", id);

    if (error) throw new Error(`Failed to delete skill: ${error.message}`);
    return { success: true }
}