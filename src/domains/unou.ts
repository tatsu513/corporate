import { WorkCategories } from 'models';

export const newsBreadcrumb = [
  {
    name: 'Home',
    path: '/unou',
  },
  {
    name: 'News Archive',
    path: '/unou/news',
  },
];

export const portfolioBreadcrumb = [
  {
    name: 'Home',
    path: '/unou',
  },
  {
    name: 'Portfolio',
    path: '/unou/portfolio',
  },
];

export const unouPortfolioCategories: WorkCategories[] = [
  {
    name: '全て',
    type: 'all',
  },
  {
    name: 'クライアントワーク',
    type: 'client',
  },
  {
    name: '自主制作',
    type: 'art',
  },
];
