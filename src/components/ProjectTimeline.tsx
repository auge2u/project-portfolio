import React, { useMemo } from 'react';
import { Project } from '../types';

interface ProjectTimelineProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

interface TimelineProject extends Project {
  year: number;
  month: number;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects, onProjectSelect }) => {
  // Prepare timeline data
  const timelineData = useMemo(() => {
    // Convert projects to timeline format with year and month
    const timelineProjects: TimelineProject[] = projects
      .filter(project => project.startDate || project.releaseDate)
      .map(project => {
        // Use release date if available, otherwise start date
        const date = project.releaseDate || project.startDate;
        if (!date) return null;
        
        const dateObj = new Date(date);
        return {
          ...project,
          year: dateObj.getFullYear(),
          month: dateObj.getMonth(),
        };
      })
      .filter((project): project is TimelineProject => project !== null)
      .sort((a, b) => {
        // Sort by year and month (descending)
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
    
    // Group projects by year
    const groupedByYear: Record<number, TimelineProject[]> = {};
    timelineProjects.forEach(project => {
      if (!groupedByYear[project.year]) {
        groupedByYear[project.year] = [];
      }
      groupedByYear[project.year].push(project);
    });
    
    // Convert to array and sort years descending
    return Object.entries(groupedByYear)
      .map(([year, yearProjects]) => ({
        year: parseInt(year),
        projects: yearProjects
      }))
      .sort((a, b) => b.year - a.year);
  }, [projects]);
  
  // Function to format date
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };
  
  // Function to get category color
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'Web Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Mobile App Development': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Machine Learning': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Blockchain': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Desktop Application': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Data Science': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'DevOps': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Cloud Computing': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      'Internet of Things': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Game Development': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    };
    
    return colorMap[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Timeline</h2>
      
      {timelineData.length > 0 ? (
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* Timeline items */}
          {timelineData.map(yearGroup => (
            <div key={yearGroup.year} className="mb-8">
              {/* Year marker */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full z-10 font-bold text-lg text-gray-800 dark:text-gray-200">
                  {yearGroup.year}
                </div>
                <div className="h-0.5 flex-grow bg-gray-300 dark:bg-gray-600 ml-4"></div>
              </div>
              
              {/* Projects in this year */}
              <div className="space-y-4 ml-20">
                {yearGroup.projects.map(project => (
                  <div
                    key={project.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500 dark:border-blue-400 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onProjectSelect(project)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Owner: </span>
                        <span className="text-gray-700 dark:text-gray-300">{project.owner}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {project.releaseDate ? 'Released: ' : 'Started: '}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {formatDate(project.releaseDate || project.startDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No timeline data available. Add start or release dates to your projects to see them here.
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline;