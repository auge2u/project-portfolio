import React, { useMemo } from "react";
import { Project, Technology } from "../types";
import TechnologyBadge from "./TechnologyBadge";

interface TechnologyTagCloudProps {
  projects: Project[];
  onTechnologySelect: (technology: string) => void;
}

interface TechCount {
  technology: Technology;
  count: number;
}

const TechnologyTagCloud: React.FC<TechnologyTagCloudProps> = ({
  projects,
  onTechnologySelect,
}) => {
  // Count occurrences of each technology across all projects
  const techCounts: TechCount[] = useMemo(() => {
    const counts = new Map<string, TechCount>();

    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        const existing = counts.get(tech.name);
        if (existing) {
          existing.count += 1;
        } else {
          counts.set(tech.name, { technology: tech, count: 1 });
        }
      });
    });

    return Array.from(counts.values()).sort((a, b) => b.count - a.count); // Sort by count descending
  }, [projects]);

  // Calculate relative font sizes based on counts
  const getRelativeSize = (count: number) => {
    const max = techCounts.length > 0 ? techCounts[0].count : 0;
    const min = Math.min(...techCounts.map((t) => t.count));

    if (max === min) return "text-base";

    const normalized = (count - min) / (max - min);

    if (normalized > 0.8) return "text-xl font-bold";
    if (normalized > 0.6) return "text-lg font-semibold";
    if (normalized > 0.4) return "text-base font-medium";
    if (normalized > 0.2) return "text-sm";
    return "text-xs";
  };

  if (techCounts.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Technology Cloud
      </h2>
      <div className="flex flex-wrap gap-3">
        {techCounts.map(({ technology, count }) => (
          <div
            key={technology.name}
            className={`${getRelativeSize(count)} cursor-pointer`}
            onClick={() => onTechnologySelect(technology.name)}
          >
            <TechnologyBadge technology={technology} />
            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
              ({count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyTagCloud;
