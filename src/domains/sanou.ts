import { WorkCategories } from 'models';

export const settlementBreadcrumb = [
  {
    name: 'Home',
    path: '/unou',
  },
  {
    name: '決算公告',
    path: '/unou/news',
  },
];

export const sanouPortfolioBreadcrumb = [
  {
    name: 'Home',
    path: '/sanou',
  },
  {
    name: 'Portfolio',
    path: '/sanou/portfolio',
  },
];

export const sanouPortfolioCategories: WorkCategories[] = [
  {
    name: '全て',
    type: 'all',
  },
  {
    name: 'グラフィック',
    type: 'graphic',
  },
  {
    name: 'WEB',
    type: 'web',
  },
  {
    name: 'UI/UX',
    type: 'uiux',
  },
  {
    name: 'ロゴ',
    type: 'logo',
  },
  {
    name: 'イラスト',
    type: 'illust',
  },
];
