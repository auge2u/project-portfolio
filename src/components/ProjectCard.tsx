import React from 'react';
import { Project } from '../types';
import TechnologyBadge from './TechnologyBadge';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  // Calculate development duration in a human-readable format
  const getDevelopmentDuration = () => {
    if (project.developmentTime) {
      return project.developmentTime >= 4
        ? `${Math.round(project.developmentTime / 4)} months`
        : `${project.developmentTime} weeks`;
    }
    if (project.startDate && project.endDate) {
      const start = new Date(project.startDate);
      const end = new Date(project.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 30
        ? `${Math.round(diffDays / 30)} months`
        : `${diffDays} days`;
    }
    return 'Unknown duration';
  };

  // Format date in a readable way
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(project)}
    >
      {project.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.name} 
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {project.segments.map((segment, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                {segment}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {project.technologies.slice(0, 6).map((tech, index) => (
              <TechnologyBadge key={index} technology={tech} />
            ))}
            {project.technologies.length > 6 && (
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                +{project.technologies.length - 6} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Duration:</span> {getDevelopmentDuration()}
            </div>
            <div>
              <span className="font-medium">Release:</span> {formatDate(project.releaseDate)}
            </div>
            {project.teamSize && (
              <div>
                <span className="font-medium">Team:</span> {project.teamSize} members
              </div>
            )}
            <div>
              <span className="font-medium">Owner:</span> {project.owner}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;