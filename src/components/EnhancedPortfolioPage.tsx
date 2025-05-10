import React, { useEffect, useState } from "react";
import { sampleProjects } from "../data/sampleProjects";
import { Project, ProjectCategory, ProjectSegment } from "../types";
import ContactSection from "./ContactSection";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";
import ProjectFilters from "./ProjectFilters";
import ProjectStatsDashboard from "./ProjectStatsDashboard";
import ProjectTimeline from "./ProjectTimeline";
import TechnologyTagCloud from "./TechnologyTagCloud";

// Tab definitions
type TabType = "grid" | "timeline" | "statistics";

interface TabDefinition {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const EnhancedPortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("grid");

  // Available tabs
  const tabs: TabDefinition[] = [
    {
      id: "grid",
      label: "Grid View",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
        </svg>
      ),
    },
    {
      id: "statistics",
      label: "Statistics",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
  ];

  // Extract unique values for filters
  const categories = Array.from(new Set(sampleProjects.map((p) => p.category)));
  const segments = Array.from(
    new Set(sampleProjects.flatMap((p) => p.segments))
  );
  const technologies = Array.from(
    new Set(sampleProjects.flatMap((p) => p.technologies))
  );
  const owners = Array.from(new Set(sampleProjects.map((p) => p.owner)));

  useEffect(() => {
    // Initialize with all projects
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
  }, []);

  const handleFilterChange = (filters: {
    category?: ProjectCategory | null;
    segment?: ProjectSegment | null;
    technology?: string | null;
    owner?: string | null;
  }) => {
    let result = [...projects];

    if (filters.category) {
      result = result.filter(
        (project) => project.category === filters.category
      );
    }

    if (filters.segment) {
      result = result.filter((project) =>
        project.segments.includes(filters.segment as ProjectSegment)
      );
    }

    if (filters.technology) {
      result = result.filter((project) =>
        project.technologies.some((tech) => tech.name === filters.technology)
      );
    }

    if (filters.owner) {
      result = result.filter((project) => project.owner === filters.owner);
    }

    setFilteredProjects(result);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  const handleTechnologySelect = (technology: string) => {
    handleFilterChange({
      technology,
    });
    // Switch to grid view to see filtered projects
    setActiveTab("grid");
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Display Tag Cloud at the top regardless of active tab */}
      <TechnologyTagCloud
        projects={projects}
        onTechnologySelect={handleTechnologySelect}
      />

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-4 px-6 font-medium text-sm inline-flex items-center space-x-2 border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters (Only shown in Grid View) */}
      {activeTab === "grid" && (
        <ProjectFilters
          categories={categories}
          segments={segments}
          technologies={technologies}
          owners={owners}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Project count (Only shown in Grid View) */}
      {activeTab === "grid" && (
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
            />
          ))}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No projects found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your filters to find projects.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "timeline" && (
        <ProjectTimeline
          projects={filteredProjects}
          onProjectSelect={handleProjectClick}
        />
      )}

      {activeTab === "statistics" && (
        <ProjectStatsDashboard projects={filteredProjects} />
      )}

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={closeProjectDetail} />
      )}

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default EnhancedPortfolioPage;
