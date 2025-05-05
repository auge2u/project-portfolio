import React from 'react';
import { Project } from '../types';
import TechnologyBadge from './TechnologyBadge';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  // Format date in a readable way
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Project header */}
          <div className="p-6 pb-0">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
              <span className="text-sm font-medium px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {project.category}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {project.segments.map((segment, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {segment}
                </span>
              ))}
            </div>
          </div>
          
          {/* Project image */}
          {project.imageUrl && (
            <div className="h-64 overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
          
          {/* Project content */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {project.longDescription || project.description}
              </p>
            </div>
            
            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <TechnologyBadge key={index} technology={tech} />
                ))}
              </div>
            </div>
            
            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Achievements</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {project.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Challenges Overcome</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {project.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Project metadata */}
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Repository:</span>
                  <div className="text-gray-600 dark:text-gray-400">
                    {project.repositoryUrl ? (
                      <a 
                        href={project.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        View Repository
                      </a>
                    ) : (
                      "Private"
                    )}
                  </div>
                </div>
                
                {project.demoUrl && (
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Demo:</span>
                    <div className="text-gray-600 dark:text-gray-400">
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        View Demo
                      </a>
                    </div>
                  </div>
                )}
                
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Start Date:</span>
                  <div className="text-gray-600 dark:text-gray-400">
                    {formatDate(project.startDate)}
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">End Date:</span>
                  <div className="text-gray-600 dark:text-gray-400">
                    {formatDate(project.endDate)}
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Release Date:</span>
                  <div className="text-gray-600 dark:text-gray-400">
                    {formatDate(project.releaseDate)}
                  </div>
                </div>
                
                {project.teamSize && (
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Team Size:</span>
                    <div className="text-gray-600 dark:text-gray-400">
                      {project.teamSize} members
                    </div>
                  </div>
                )}
                
                {project.budget && (
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Budget:</span>
                    <div className="text-gray-600 dark:text-gray-400">
                      {project.budget}
                    </div>
                  </div>
                )}
                
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Owner:</span>
                  <div className="text-gray-600 dark:text-gray-400">
                    {project.owner}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;