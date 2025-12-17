export interface Profile {
    id: string;
    name: string;
    job_title: string;
    bio?: string;
    email?: string;
    phone?: string;
    location?: string;
    avatar_url?: string;
    resume_url?: string;
    github_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    portfolio_url?: string;
    roles?: string[];
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: string;
    title: string;
    description?: string;
    short_description?: string;
    image_url?: string;
    demo_url?: string;
    github_url?: string;
    tech_stack?: string[];
    featured: boolean;
    status: 'completed' | 'in-progress' | 'planned' | 'ongoing';
    order_index: number;
    created_at: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    location?: string;
    start_date: string;
    end_date?:string;
    is_current: boolean;
    description?: string;
    responsibilities?: string[];
    achievements?: string[];
    tech_stack?: string[];
    order_index: number;
    created_at: string;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    proficiency?: number;
    icon_url?: string;
    order_index: number;
    created_at: string;
}