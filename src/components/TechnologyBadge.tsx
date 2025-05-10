import React, { useState } from "react";
import { Technology } from "../types";

interface TechnologyBadgeProps {
  technology: Technology;
}

const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({ technology }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Color mappings based on technology category
  const getCategoryColor = () => {
    switch (technology.category) {
      case "Programming Language":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Framework":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Library":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case "Database":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Cloud Service":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Development Tool":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "Platform":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Get styled icon with first letter of technology name
  const getIcon = () => {
    // Create a colored circle with the first letter of the tech name
    const firstLetter = technology.name.charAt(0).toUpperCase();

    // Get color for background based on tech category
    const getIconBgColor = () => {
      switch (technology.category) {
        case "Programming Language":
          return "bg-green-600";
        case "Framework":
          return "bg-blue-600";
        case "Library":
          return "bg-indigo-600";
        case "Database":
          return "bg-yellow-600";
        case "Cloud Service":
          return "bg-purple-600";
        case "Development Tool":
          return "bg-gray-600";
        case "Platform":
          return "bg-red-600";
        default:
          return "bg-gray-500";
      }
    };

    return (
      <span
        className={`w-4 h-4 mr-1 inline-flex items-center justify-center rounded-full text-white text-xs font-bold ${getIconBgColor()}`}
      >
        {firstLetter}
      </span>
    );
  };

  return (
    <div className="relative inline-block">
      <span
        className={`flex items-center text-xs px-2 py-1 rounded cursor-pointer ${getCategoryColor()}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {getIcon()}
        {technology.name}
      </span>

      {showTooltip && technology.description && (
        <div className="absolute z-10 w-48 p-2 mt-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-200 shadow-lg dark:text-gray-200 dark:bg-gray-800 dark:border-gray-600">
          <div className="font-medium mb-1">{technology.name}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            {technology.category}
          </div>
          <p className="text-xs">{technology.description}</p>
        </div>
      )}
    </div>
  );
};

export default TechnologyBadge;
