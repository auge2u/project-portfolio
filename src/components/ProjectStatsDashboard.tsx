import React, { useMemo } from 'react';
import { Project, ProjectCategory, ProjectSegment, Technology } from '../types';

interface ProjectStatsDashboardProps {
  projects: Project[];
}

interface StatsData {
  totalProjects: number;
  projectsByCategory: Record<string, number>;
  projectsBySegment: Record<string, number>;
  projectsByOwner: Record<string, number>;
  topTechnologies: { name: string; count: number }[];
  averageDevelopmentTime: number;
  averageTeamSize: number;
  projectsOverTime: { year: number; count: number }[];
}

const ProjectStatsDashboard: React.FC<ProjectStatsDashboardProps> = ({ projects }) => {
  const stats: StatsData = useMemo(() => {
    // Calculate statistics from projects
    const projectsByCategory: Record<string, number> = {};
    const projectsBySegment: Record<string, number> = {};
    const projectsByOwner: Record<string, number> = {};
    const technologiesCount: Record<string, number> = {};
    let totalDevelopmentTime = 0;
    let projectsWithDevelopmentTime = 0;
    let totalTeamSize = 0;
    let projectsWithTeamSize = 0;
    
    // Years data for timeline chart
    const yearsData: Record<number, number> = {};
    
    projects.forEach(project => {
      // Count by category
      projectsByCategory[project.category] = (projectsByCategory[project.category] || 0) + 1;
      
      // Count by segment
      project.segments.forEach(segment => {
        projectsBySegment[segment] = (projectsBySegment[segment] || 0) + 1;
      });
      
      // Count by owner
      projectsByOwner[project.owner] = (projectsByOwner[project.owner] || 0) + 1;
      
      // Count technologies
      project.technologies.forEach(tech => {
        technologiesCount[tech.name] = (technologiesCount[tech.name] || 0) + 1;
      });
      
      // Calculate development time average
      if (project.developmentTime) {
        totalDevelopmentTime += project.developmentTime;
        projectsWithDevelopmentTime++;
      }
      
      // Calculate team size average
      if (project.teamSize) {
        totalTeamSize += project.teamSize;
        projectsWithTeamSize++;
      }
      
      // Years data
      const year = project.yearOfDevelopment || 
                  (project.startDate ? new Date(project.startDate).getFullYear() : null);
      if (year) {
        yearsData[year] = (yearsData[year] || 0) + 1;
      }
    });
    
    // Sort technologies by count to get top technologies
    const sortedTechnologies = Object.entries(technologiesCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Convert years data to array for chart
    const projectsOverTime = Object.entries(yearsData)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);
    
    return {
      totalProjects: projects.length,
      projectsByCategory,
      projectsBySegment,
      projectsByOwner,
      topTechnologies: sortedTechnologies,
      averageDevelopmentTime: projectsWithDevelopmentTime > 0 
        ? Math.round(totalDevelopmentTime / projectsWithDevelopmentTime) 
        : 0,
      averageTeamSize: projectsWithTeamSize > 0 
        ? Math.round(totalTeamSize / projectsWithTeamSize * 10) / 10
        : 0,
      projectsOverTime
    };
  }, [projects]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects Card */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">{stats.totalProjects}</span>
          <p className="text-blue-800 dark:text-blue-200 mt-1">Total Projects</p>
        </div>
        
        {/* Total Technologies Card */}
        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-green-600 dark:text-green-300">{stats.topTechnologies.length}</span>
          <p className="text-green-800 dark:text-green-200 mt-1">Unique Technologies</p>
        </div>
        
        {/* Average Development Time Card */}
        <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-purple-600 dark:text-purple-300">{stats.averageDevelopmentTime}</span>
          <p className="text-purple-800 dark:text-purple-200 mt-1">Avg. Dev. Time (weeks)</p>
        </div>
        
        {/* Average Team Size Card */}
        <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 text-center">
          <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">{stats.averageTeamSize}</span>
          <p className="text-yellow-800 dark:text-yellow-200 mt-1">Avg. Team Size</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Categories Distribution */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Categories</h3>
          <div className="space-y-2">
            {Object.entries(stats.projectsByCategory).map(([category, count]) => (
              <div key={category} className="flex items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mr-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full" 
                    style={{ width: `${(count / stats.totalProjects) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 min-w-[120px] flex justify-between">
                  <span>{category}</span>
                  <span className="font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Technologies */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Technologies</h3>
          <div className="space-y-2">
            {stats.topTechnologies.slice(0, 5).map(({ name, count }) => (
              <div key={name} className="flex items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mr-2">
                  <div 
                    className="bg-green-600 dark:bg-green-400 h-4 rounded-full" 
                    style={{ width: `${(count / Math.max(...stats.topTechnologies.map(t => t.count))) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 min-w-[120px] flex justify-between">
                  <span>{name}</span>
                  <span className="font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Projects Over Time */}
      {stats.projectsOverTime.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Projects Timeline</h3>
          <div className="h-40 flex items-end space-x-2">
            {stats.projectsOverTime.map(({ year, count }) => {
              const maxCount = Math.max(...stats.projectsOverTime.map(y => y.count));
              const height = `${(count / maxCount) * 100}%`;
              return (
                <div key={year} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-indigo-500 dark:bg-indigo-400 rounded-t"
                    style={{ height }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">{year}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectStatsDashboard;