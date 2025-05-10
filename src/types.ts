// src/types.ts

// Technology related types
export enum TechnologyCategory {
  LANGUAGE = "Programming Language",
  FRAMEWORK = "Framework",
  LIBRARY = "Library",
  DATABASE = "Database",
  CLOUD_SERVICE = "Cloud Service",
  TOOL = "Development Tool",
  PLATFORM = "Platform",
}

export interface Technology {
  name: string;
  category: TechnologyCategory;
  icon?: string;
  description?: string;
}

// Project related types
export enum ProjectCategory {
  WEB_DEVELOPMENT = "Web Development",
  MOBILE_APP_DEVELOPMENT = "Mobile App Development",
  MACHINE_LEARNING = "Machine Learning",
  DEVOPS = "DevOps",
  BLOCKCHAIN = "Blockchain",
  DATA_ENGINEERING = "Data Engineering",
  GAME_DEVELOPMENT = "Game Development",
}

export enum ProjectSegment {
  FRONTEND = "Frontend",
  BACKEND = "Backend",
  FULLSTACK = "Full Stack",
  MOBILE = "Mobile",
  DATA_ENGINEERING = "Data Engineering",
  INFRASTRUCTURE = "Infrastructure",
  SECURITY = "Security",
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  repositoryUrl?: string;
  imageUrl?: string;
  owner: string;
  category: ProjectCategory;
  segments: ProjectSegment[];
  technologies: Technology[];
  startDate?: Date;
  endDate?: Date;
  developmentTime?: number; // in weeks
  yearOfDevelopment?: number;
  releaseDate?: Date;
  teamSize?: number;
  budget?: string;
  achievements?: string[];
  features?: string[];
  challenges?: string[];
  isHighlighted?: boolean;
  sortOrder?: number;
  demoUrl?: string;
}
