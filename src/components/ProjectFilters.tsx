import React, { useState } from 'react';
import { ProjectCategory, ProjectSegment, Technology } from '../types';

interface ProjectFiltersProps {
  categories: ProjectCategory[];
  segments: ProjectSegment[];
  technologies: Technology[];
  owners: string[];
  onFilterChange: (filters: {
    category?: ProjectCategory | null;
    segment?: ProjectSegment | null;
    technology?: string | null;
    owner?: string | null;
  }) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  categories,
  segments,
  technologies,
  owners,
  onFilterChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<ProjectSegment | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleCategoryChange = (category: ProjectCategory | null) => {
    setSelectedCategory(category);
    onFilterChange({
      category,
      segment: selectedSegment,
      technology: selectedTechnology,
      owner: selectedOwner,
    });
  };

  const handleSegmentChange = (segment: ProjectSegment | null) => {
    setSelectedSegment(segment);
    onFilterChange({
      category: selectedCategory,
      segment,
      technology: selectedTechnology,
      owner: selectedOwner,
    });
  };

  const handleTechnologyChange = (technology: string | null) => {
    setSelectedTechnology(technology);
    onFilterChange({
      category: selectedCategory,
      segment: selectedSegment,
      technology,
      owner: selectedOwner,
    });
  };

  const handleOwnerChange = (owner: string | null) => {
    setSelectedOwner(owner);
    onFilterChange({
      category: selectedCategory,
      segment: selectedSegment,
      technology: selectedTechnology,
      owner,
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSegment(null);
    setSelectedTechnology(null);
    setSelectedOwner(null);
    onFilterChange({
      category: null,
      segment: null,
      technology: null,
      owner: null,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
        <div className="flex space-x-2">
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear All
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {expanded ? 'Collapse' : 'Expand'} Filters
          </button>
        </div>
      </div>

      {/* Always visible filters */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => handleCategoryChange(e.target.value ? e.target.value as ProjectCategory : null)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Owner
          </label>
          <select
            value={selectedOwner || ''}
            onChange={(e) => handleOwnerChange(e.target.value || null)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Owners</option>
            {owners.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expandable filters */}
      {expanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Segment
            </label>
            <select
              value={selectedSegment || ''}
              onChange={(e) => handleSegmentChange(e.target.value ? e.target.value as ProjectSegment : null)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Segments</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Technology
            </label>
            <select
              value={selectedTechnology || ''}
              onChange={(e) => handleTechnologyChange(e.target.value || null)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Technologies</option>
              {technologies.map((tech) => (
                <option key={tech.name} value={tech.name}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;