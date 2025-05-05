// src/data/sampleProjects.ts
import { Project, ProjectCategory, ProjectSegment, Technology, TechnologyCategory } from '../types';

// Define common technologies
const technologies: Record<string, Technology> = {
  react: {
    name: 'React',
    category: TechnologyCategory.FRAMEWORK,
    icon: 'react',
    description: 'A JavaScript library for building user interfaces'
  },
  typescript: {
    name: 'TypeScript',
    category: TechnologyCategory.LANGUAGE,
    icon: 'typescript',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript'
  },
  node: {
    name: 'Node.js',
    category: TechnologyCategory.PLATFORM,
    icon: 'nodejs',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine'
  },
  express: {
    name: 'Express',
    category: TechnologyCategory.FRAMEWORK,
    icon: 'express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js'
  },
  mongodb: {
    name: 'MongoDB',
    category: TechnologyCategory.DATABASE,
    icon: 'mongodb',
    description: 'A document-based NoSQL database'
  },
  postgres: {
    name: 'PostgreSQL',
    category: TechnologyCategory.DATABASE,
    icon: 'postgresql',
    description: 'A powerful, open-source object-relational database system'
  },
  aws: {
    name: 'AWS',
    category: TechnologyCategory.CLOUD_SERVICE,
    icon: 'aws',
    description: 'Amazon Web Services cloud platform'
  },
  docker: {
    name: 'Docker',
    category: TechnologyCategory.TOOL,
    icon: 'docker',
    description: 'Platform for developing, shipping, and running applications in containers'
  },
  kubernetes: {
    name: 'Kubernetes',
    category: TechnologyCategory.TOOL,
    icon: 'kubernetes',
    description: 'Container orchestration platform'
  },
  tailwind: {
    name: 'Tailwind CSS',
    category: TechnologyCategory.FRAMEWORK,
    icon: 'tailwind',
    description: 'A utility-first CSS framework'
  },
  python: {
    name: 'Python',
    category: TechnologyCategory.LANGUAGE,
    icon: 'python',
    description: 'An interpreted, high-level, general-purpose programming language'
  },
  tensorflow: {
    name: 'TensorFlow',
    category: TechnologyCategory.LIBRARY,
    icon: 'tensorflow',
    description: 'An open-source machine learning framework'
  },
  flutter: {
    name: 'Flutter',
    category: TechnologyCategory.FRAMEWORK,
    icon: 'flutter',
    description: 'Google\'s UI toolkit for building natively compiled applications'
  }
};

// Sample project data
export const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product catalog, shopping cart, and payment processing',
    longDescription: 'A comprehensive e-commerce solution built with modern technologies. Features include product catalog with advanced filtering, shopping cart management, secure payment processing, user accounts, and admin dashboard for inventory management.',
    repositoryUrl: 'https://github.com/habitusnet/ecommerce-platform',
    imageUrl: 'https://via.placeholder.com/800x600',
    owner: 'habitusnet',
    category: ProjectCategory.WEB_DEVELOPMENT,
    segments: [ProjectSegment.FULLSTACK],
    technologies: [
      technologies.react,
      technologies.node,
      technologies.express,
      technologies.mongodb,
      technologies.typescript,
      technologies.aws
    ],
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-30'),
    developmentTime: 26, // weeks
    yearOfDevelopment: 2023,
    releaseDate: new Date('2023-07-15'),
    teamSize: 4,
    budget: '$50,000 - $75,000',
    achievements: [
      'Increased conversion rate by 25%',
      'Reduced page load time by 40%',
      'Successfully processed over 10,000 orders'
    ],
    features: [
      'Responsive product catalog with advanced filtering',
      'Secure payment processing with multiple gateways',
      'User accounts with order history',
      'Admin dashboard for inventory management'
    ],
    challenges: [
      'Implementing real-time inventory updates',
      'Optimizing database queries for performance',
      'Ensuring PCI compliance for payment processing'
    ],
    isHighlighted: true,
    sortOrder: 1
  },
  {
    id: '2',
    name: 'Health Tracking Mobile App',
    description: 'A cross-platform mobile application for tracking health metrics and fitness activities',
    longDescription: 'A user-friendly mobile app designed to help users track various health metrics, including steps, workouts, nutrition, and sleep patterns. The app provides insightful data visualizations and personalized recommendations.',
    repositoryUrl: 'https://github.com/flyerbee/health-tracker',
    imageUrl: 'https://via.placeholder.com/800x600',
    owner: 'flyerbee',
    category: ProjectCategory.MOBILE_APP_DEVELOPMENT,
    segments: [ProjectSegment.MOBILE, ProjectSegment.BACKEND],
    technologies: [
      technologies.flutter,
      technologies.node,
      technologies.express,
      technologies.postgres,
      technologies.aws
    ],
    startDate: new Date('2022-08-01'),
    endDate: new Date('2023-02-28'),
    developmentTime: 30, // weeks
    yearOfDevelopment: 2023,
    releaseDate: new Date('2023-03-15'),
    teamSize: 3,
    budget: '$40,000 - $60,000',
    achievements: [
      'Over 50,000 downloads in the first month',
      'Featured in Health & Fitness category in app stores',
      '4.8 average user rating'
    ],
    features: [
      'Comprehensive health metric tracking',
      'Customizable workout plans',
      'Nutrition logging and analysis',
      'Sleep quality monitoring',
      'Progress visualization and reports'
    ],
    challenges: [
      'Ensuring accurate data synchronization across devices',
      'Optimizing battery usage during background tracking',
      'Implementing privacy-focused data handling'
    ],
    isHighlighted: true,
    sortOrder: 2
  },
  {
    id: '3',
    name: 'Predictive Analytics Platform',
    description: 'A machine learning platform for business analytics and predictive insights',
    longDescription: 'An enterprise-grade analytics platform that leverages machine learning algorithms to provide predictive insights for business decision-making. The platform integrates with various data sources, processes large datasets, and generates actionable recommendations.',
    repositoryUrl: 'https://github.com/rhelvia/predictive-analytics',
    imageUrl: 'https://via.placeholder.com/800x600',
    owner: 'rhelvia',
    category: ProjectCategory.MACHINE_LEARNING,
    segments: [ProjectSegment.DATA_ENGINEERING, ProjectSegment.BACKEND, ProjectSegment.FRONTEND],
    technologies: [
      technologies.python,
      technologies.tensorflow,
      technologies.react,
      technologies.typescript,
      technologies.postgres,
      technologies.docker,
      technologies.kubernetes
    ],
    startDate: new Date('2022-03-01'),
    endDate: new Date('2023-01-31'),
    developmentTime: 48, // weeks
    yearOfDevelopment: 2022,
    releaseDate: new Date('2023-02-15'),
    teamSize: 5,
    budget: '$100,000 - $150,000',
    achievements: [
      'Improved forecast accuracy by 35% for key clients',
      'Reduced data processing time by 60%',
      'Successfully deployed to 5 enterprise clients'
    ],
    features: [
      'Automated data collection and preprocessing',
      'Custom machine learning model development',
      'Interactive dashboards and visualizations',
      'Scheduled reporting and alerts',
      'API integration with existing business systems'
    ],
    challenges: [
      'Handling diverse data formats from multiple sources',
      'Ensuring model accuracy and reliability',
      'Scaling infrastructure for large data processing'
    ],
    isHighlighted: true,
    sortOrder: 3
  },
  {
    id: '4',
    name: 'Cloud Infrastructure Automation',
    description: 'A DevOps solution for automating cloud infrastructure deployment and management',
    longDescription: 'A comprehensive DevOps toolset that enables teams to automate the provisioning, configuration, and management of cloud infrastructure. The solution provides infrastructure as code, continuous integration and deployment, and monitoring capabilities.',
    repositoryUrl: 'https://github.com/habitusnet/cloud-automation',
    imageUrl: 'https://via.placeholder.com/800x600',
    owner: 'habitusnet',
    category: ProjectCategory.DEVOPS,
    segments: [ProjectSegment.INFRASTRUCTURE],
    technologies: [
      technologies.docker,
      technologies.kubernetes,
      technologies.aws,
      technologies.typescript,
      technologies.node
    ],
    startDate: new Date('2022-05-15'),
    endDate: new Date('2022-11-30'),
    developmentTime: 28, // weeks
    yearOfDevelopment: 2022,
    releaseDate: new Date('2022-12-10'),
    teamSize: 3,
    budget: '$70,000 - $90,000',
    achievements: [
      'Reduced infrastructure deployment time by 80%',
      'Decreased monthly cloud costs by 35%',
      'Implemented zero-downtime deployment process'
    ],
    features: [
      'Infrastructure as Code (IaC) templates',
      'Automated environment provisioning',
      'Continuous integration and deployment pipelines',
      'Cost optimization recommendations',
      'Real-time monitoring and alerting'
    ],
    challenges: [
      'Ensuring security compliance across all environments',
      'Managing state across multiple cloud providers',
      'Implementing disaster recovery procedures'
    ],
    isHighlighted: false,
    sortOrder: 4
  },
  {
    id: '5',
    name: 'Blockchain Trading Platform',
    description: 'A secure cryptocurrency trading platform built on blockchain technology',
    longDescription: 'A secure and user-friendly platform for trading cryptocurrencies and digital assets. The platform leverages blockchain technology to ensure transparency, security, and immutability of transactions, while providing advanced trading features and analytics.',
    repositoryUrl: 'https://github.com/flyerbee/crypto-trading',
    imageUrl: 'https://via.placeholder.com/800x600',
    owner: 'flyerbee',
    category: ProjectCategory.BLOCKCHAIN,
    segments: [ProjectSegment.FULLSTACK, ProjectSegment.SECURITY],
    technologies: [
      technologies.react,
      technologies.node,
      technologies.typescript,
      technologies.mongodb,
      technologies.docker
    ],
    startDate: new Date('2021-10-01'),
    endDate: new Date('2022-06-30'),
    developmentTime: 38, // weeks
    yearOfDevelopment: 2022,
    releaseDate: new Date('2022-07-15'),
    teamSize: 6,
    budget: '$120,000 - $180,000',
    achievements: [
      'Processed over $10 million in trading volume in the first quarter',
      'Achieved 99.99% uptime since launch',
      'Zero security breaches or incidents'
    ],
    features: [
      'Real-time market data and charts',
      'Secure wallet integration',
      'Advanced trading tools and order types',
      'Two-factor authentication and encryption',
      'Detailed transaction history and reports'
    ],
    challenges: [
      'Ensuring regulatory compliance across different jurisdictions',
      'Implementing high-performance order matching engine',
      'Building secure wallet infrastructure'
    ],
    isHighlighted: true,
    sortOrder: 5
  }
];

// Project collection implementation
export const getProjectCollection = () => {
  return {
    projects: sampleProjects,
    getByCategory: (category: ProjectCategory) => 
      sampleProjects.filter(project => project.category === category),
    getBySegment: (segment: ProjectSegment) => 
      sampleProjects.filter(project => project.segments.includes(segment)),
    getByTechnology: (technology: string) => 
      sampleProjects.filter(project => 
        project.technologies.some(tech => tech.name.toLowerCase() === technology.toLowerCase())
      ),
    getByOwner: (owner: string) => 
      sampleProjects.filter(project => project.owner === owner),
    getHighlighted: () => 
      sampleProjects.filter(project => project.isHighlighted)
  };
};