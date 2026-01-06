import { z } from "zod";

// Profile validation
export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  job_title: z.string().min(2, "Job title is required"),
  bio: z.string().optional(),
  email: z.email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatar_url: z.url("Invalid URL").optional().or(z.literal("")),
  resume_url: z.url("Invalid URL").optional().or(z.literal("")),
  github_url: z.url("Invalid URL").optional().or(z.literal("")),
  linkedin_url: z.url("Invalid URL").optional().or(z.literal("")),
  twitter_url: z.url("Invalid URL").optional().or(z.literal("")),
  instagram_url: z.url("Invalid URL").optional().or(z.literal("")),
  portfolio_url: z.url("Invalid URL").optional().or(z.literal("")),
  roles: z.array(z.string()).optional(),
});

export const updateProfileSchema = profileSchema.partial();

// Project validation
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  short_description: z.string().max(200, "Short description must be under 200 characters").optional(),
  image_url: z.url("Invalid image URL").optional().or(z.literal("")),
  demo_url: z.url("Invalid demo URL").optional().or(z.literal("")),
  github_url: z.url("Invalid GitHub URL").optional().or(z.literal("")),
  tech_stack: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
  order_index: z.number().int().default(0),
});

export const updateProjectSchema = projectSchema.partial();

// Experience validation
export const experienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  location: z.string().optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)").optional().or(z.literal("")),
  is_current: z.boolean().default(false),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  tech_stack: z.array(z.string()).optional(),
  order_index: z.number().int().default(0),
});

export const updateExperienceSchema = experienceSchema.partial();

// Skill validation
export const skillSchema = z.object({
  name: z.string().min(2, "Skill name is required"),
  category: z.string().min(2, "Category is required"),
  proficiency: z.number().int().min(1).max(5).optional(),
  icon_url: z.url("Invalid icon URL").optional().or(z.literal("")),
  order_index: z.number().int().default(0),
});

export const updateSkillSchema = skillSchema.partial();