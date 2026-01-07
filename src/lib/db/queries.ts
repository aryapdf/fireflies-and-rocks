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
    
    if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
}

