const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const config = {
  // List of GitHub accounts to fetch repositories from
  accounts: ['habitusnet', 'auge2u', 'flyerbee', 'rhelvia'],
  // GitHub personal access token (Optional, but recommended to avoid rate limits)
  // Create one at https://github.com/settings/tokens
  token: process.env.GITHUB_TOKEN || '',
  // Output file path relative to project root
  outputPath: './src/data/githubProjects.ts',
};

/**
 * Fetches repositories for a given GitHub username
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - Array of repositories
 */
async function fetchUserRepos(username) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${username}/repos?type=all&sort=updated&per_page=100`,
      headers: {
        'User-Agent': 'Project-Portfolio-Generator',
        Accept: 'application/vnd.github.v3+json',
      },
    };

    // Add authentication if token is provided
    if (config.token) {
      options.headers.Authorization = `token ${config.token}`;
    }

    const req = https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const repos = JSON.parse(data);
            console.log(`Successfully fetched ${repos.length} repositories for ${username}`);
            resolve(repos);
          } catch (err) {
            reject(new Error(`Failed to parse GitHub API response: ${err.message}`));
          }
        } else {
          reject(new Error(`GitHub API returned status code ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Failed to fetch repositories: ${err.message}`));
    });

    req.end();
  });
}

/**
 * Fetches repository languages for a given repository
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise<Object>} - Object containing language stats
 */
async function fetchRepoLanguages(username, repoName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${username}/${repoName}/languages`,
      headers: {
        'User-Agent': 'Project-Portfolio-Generator',
        Accept: 'application/vnd.github.v3+json',
      },
    };

    // Add authentication if token is provided
    if (config.token) {
      options.headers.Authorization = `token ${config.token}`;
    }

    const req = https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const languages = JSON.parse(data);
            resolve(languages);
          } catch (err) {
            reject(new Error(`Failed to parse GitHub API languages response: ${err.message}`));
          }
        } else {
          reject(new Error(`GitHub API returned status code ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Failed to fetch repository languages: ${err.message}`));
    });

    req.end();
  });
}

/**
 * Maps GitHub repository data to the portfolio project model
 * @param {Array} repos - Array of GitHub repositories
 * @param {string} owner - Repository owner (GitHub username)
 * @returns {Array} - Array of projects in the portfolio format
 */
async function mapReposToProjects(repos, owner) {
  const projects = [];

  for (const repo of repos) {
    // Skip forks if needed
    if (repo.fork) continue;

    try {
      // Fetch languages for the repository
      const languages = await fetchRepoLanguages(owner, repo.name);
      
      // Map language data to technology objects
      const technologies = Object.keys(languages).map(lang => ({
        name: lang,
        category: mapLanguageToCategory(lang),
        icon: lang.toLowerCase(),
        description: `${lang} programming language`
      }));

      // Determine project category based on topics, description, or languages
      const category = determineProjectCategory(repo, technologies);
      
      // Determine project segments based on repository content
      const segments = determineProjectSegments(repo, technologies);

      // Create project object in the portfolio format
      const project = {
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description || `A ${category} project by ${owner}`,
        longDescription: repo.description || `A ${category} project by ${owner}`,
        repositoryUrl: repo.html_url,
        owner: owner,
        category: category,
        segments: segments,
        technologies: technologies,
        startDate: repo.created_at ? new Date(repo.created_at) : undefined,
        // Use pushed_at as end date if the repo is not being actively updated
        endDate: repo.pushed_at ? new Date(repo.pushed_at) : undefined,
        // Calculate development time in weeks
        developmentTime: calculateDevelopmentTime(repo.created_at, repo.pushed_at),
        yearOfDevelopment: repo.created_at ? new Date(repo.created_at).getFullYear() : undefined,
        // Use the latest date between updated_at and pushed_at as release date
        releaseDate: getLatestDate(repo.updated_at, repo.pushed_at),
        // We don't have team size information from GitHub API
        teamSize: undefined,
        // We don't have budget information from GitHub API
        budget: undefined,
        // We don't have achievements information from GitHub API
        achievements: [],
        // Extract features from the repository description or readme if available
        features: [],
        // We don't have challenges information from GitHub API
        challenges: [],
        // Mark repositories with stars as highlighted
        isHighlighted: repo.stargazers_count > 0,
        // Sort by last updated date (converted to a number for sorting)
        sortOrder: new Date(repo.updated_at).getTime(),
      };

      projects.push(project);
    } catch (error) {
      console.error(`Error processing repository ${owner}/${repo.name}:`, error.message);
    }
  }

  return projects;
}

/**
 * Maps a programming language to a technology category
 * @param {string} language - Programming language name
 * @returns {string} - Technology category
 */
function mapLanguageToCategory(language) {
  // Map common languages to categories
  const categoryMap = {
    'JavaScript': 'Programming Language',
    'TypeScript': 'Programming Language',
    'Python': 'Programming Language',
    'Java': 'Programming Language',
    'C#': 'Programming Language',
    'PHP': 'Programming Language',
    'Ruby': 'Programming Language',
    'Go': 'Programming Language',
    'Rust': 'Programming Language',
    'Swift': 'Programming Language',
    'Kotlin': 'Programming Language',
    'C++': 'Programming Language',
    'C': 'Programming Language',
    'HTML': 'Markup Language',
    'CSS': 'Stylesheet Language',
    'SCSS': 'Stylesheet Language',
    'LESS': 'Stylesheet Language',
    'Shell': 'Scripting Language',
    'PowerShell': 'Scripting Language',
    'Dockerfile': 'Configuration',
    'Makefile': 'Configuration',
  };

  return categoryMap[language] || 'Other';
}

/**
 * Determines the project category based on repository data
 * @param {Object} repo - GitHub repository data
 * @param {Array} technologies - Array of technology objects
 * @returns {string} - Project category
 */
function determineProjectCategory(repo, technologies) {
  // Default category
  let category = 'Other';

  // Extract topics from repository
  const topics = repo.topics || [];
  const techNames = technologies.map(tech => tech.name.toLowerCase());
  const description = (repo.description || '').toLowerCase();

  // Check for web development indicators
  if (
    topics.some(topic => ['web', 'webapp', 'website', 'frontend', 'backend', 'fullstack'].includes(topic)) ||
    techNames.some(tech => ['javascript', 'typescript', 'html', 'css', 'react', 'vue', 'angular', 'node', 'express', 'django', 'rails'].includes(tech)) ||
    description.includes('web') ||
    description.includes('website') ||
    description.includes('frontend') ||
    description.includes('backend')
  ) {
    category = 'Web Development';
  }
  // Check for mobile app development indicators
  else if (
    topics.some(topic => ['mobile', 'android', 'ios', 'flutter', 'react-native'].includes(topic)) ||
    techNames.some(tech => ['swift', 'kotlin', 'java', 'objective-c', 'flutter', 'react native'].includes(tech)) ||
    description.includes('mobile') ||
    description.includes('android') ||
    description.includes('ios') ||
    description.includes('app')
  ) {
    category = 'Mobile App Development';
  }
  // Check for machine learning indicators
  else if (
    topics.some(topic => ['machine-learning', 'ml', 'ai', 'data-science', 'deep-learning'].includes(topic)) ||
    techNames.some(tech => ['python', 'r', 'jupyter'].includes(tech)) &&
    (description.includes('machine learning') ||
     description.includes('deep learning') ||
     description.includes('neural') ||
     description.includes('ai') ||
     description.includes('prediction'))
  ) {
    category = 'Machine Learning';
  }
  // Add more category detection logic as needed

  return category;
}

/**
 * Determines the project segments based on repository data
 * @param {Object} repo - GitHub repository data
 * @param {Array} technologies - Array of technology objects
 * @returns {Array} - Array of project segments
 */
function determineProjectSegments(repo, technologies) {
  const segments = [];
  const topics = repo.topics || [];
  const techNames = technologies.map(tech => tech.name.toLowerCase());
  const description = (repo.description || '').toLowerCase();

  // Frontend segment
  if (
    topics.includes('frontend') ||
    techNames.some(tech => ['html', 'css', 'javascript', 'typescript', 'react', 'vue', 'angular'].includes(tech)) ||
    description.includes('frontend') ||
    description.includes('ui') ||
    description.includes('user interface')
  ) {
    segments.push('Frontend');
  }

  // Backend segment
  if (
    topics.includes('backend') ||
    techNames.some(tech => ['node', 'express', 'django', 'flask', 'spring', 'rails', 'laravel', 'php'].includes(tech)) ||
    description.includes('backend') ||
    description.includes('server') ||
    description.includes('api')
  ) {
    segments.push('Backend');
  }

  // If both frontend and backend are detected, add fullstack
  if (segments.includes('Frontend') && segments.includes('Backend')) {
    segments.push('Full Stack');
  }

  // Mobile segment
  if (
    topics.some(topic => ['mobile', 'android', 'ios', 'flutter', 'react-native'].includes(topic)) ||
    techNames.some(tech => ['swift', 'kotlin', 'java', 'objective-c', 'flutter', 'react native'].includes(tech)) ||
    description.includes('mobile') ||
    description.includes('android') ||
    description.includes('ios')
  ) {
    segments.push('Mobile');
  }

  // Add more segment detection logic as needed

  // If no segments were detected, add 'Other'
  if (segments.length === 0) {
    segments.push('Other');
  }

  return segments;
}

/**
 * Calculates development time in weeks
 * @param {string} startDate - Repository creation date
 * @param {string} endDate - Repository last push date
 * @returns {number} - Development time in weeks
 */
function calculateDevelopmentTime(startDate, endDate) {
  if (!startDate || !endDate) return undefined;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 7); // Convert days to weeks
}

/**
 * Gets the latest date between two date strings
 * @param {string} date1 - First date string
 * @param {string} date2 - Second date string
 * @returns {Date} - Latest date
 */
function getLatestDate(date1, date2) {
  if (!date1 && !date2) return undefined;
  if (!date1) return new Date(date2);
  if (!date2) return new Date(date1);

  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1 > d2 ? d1 : d2;
}

/**
 * Main function to fetch repositories and generate project data
 */
async function main() {
  try {
    let allProjects = [];

    // Fetch repositories for each account
    for (const account of config.accounts) {
      console.log(`Fetching repositories for ${account}...`);
      const repos = await fetchUserRepos(account);
      console.log(`Processing ${repos.length} repositories for ${account}...`);
      const projects = await mapReposToProjects(repos, account);
      allProjects = allProjects.concat(projects);
    }

    // Sort projects by sortOrder (most recently updated first)
    allProjects.sort((a, b) => b.sortOrder - a.sortOrder);

    // Generate TypeScript code for the projects
    const typescriptCode = `// src/data/githubProjects.ts
// This file was automatically generated on ${new Date().toISOString()}
// using the fetchGithubData.js script

import { Project, ProjectCategory, ProjectSegment, Technology, TechnologyCategory } from '../types';

// Project data fetched from GitHub
export const githubProjects: Project[] = ${JSON.stringify(allProjects, null, 2).replace(/"([^"]+)":/g, '$1:')};

// Project collection implementation
export const getProjectCollection = () => {
  return {
    projects: githubProjects,
    getByCategory: (category: ProjectCategory) => 
      githubProjects.filter(project => project.category === category),
    getBySegment: (segment: ProjectSegment) => 
      githubProjects.filter(project => project.segments.includes(segment)),
    getByTechnology: (technology: string) => 
      githubProjects.filter(project => 
        project.technologies.some(tech => tech.name.toLowerCase() === technology.toLowerCase())
      ),
    getByOwner: (owner: string) => 
      githubProjects.filter(project => project.owner === owner),
    getHighlighted: () => 
      githubProjects.filter(project => project.isHighlighted)
  };
};
`;

    // Ensure the output directory exists
    const outputDir = path.dirname(config.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the output file
    fs.writeFileSync(config.outputPath, typescriptCode);
    console.log(`Successfully generated ${allProjects.length} projects and saved to ${config.outputPath}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();