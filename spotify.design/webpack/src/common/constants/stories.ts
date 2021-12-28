import { ROUTE } from './routes';

export interface StoriesCategory {
  id: string;
  order: number;
  title: string;
  slug: string;
  description: string;
}

export const STORIES_CATEGORIES: StoriesCategory[] = [
  {
    id: 'all',
    order: 1,
    title: 'All Stories',
    slug: `${ROUTE.STORIES}`,
    description: '',
  },
  {
    id: 'design',
    order: 2,
    title: 'Design',
    slug: `${ROUTE.STORIES}/design`,
    description: 'See what we do and why we do it.',
  },
  {
    id: 'inspiration',
    order: 3,
    title: 'Inspiration',
    slug: `${ROUTE.STORIES}/inspiration`,
    description: 'Stimulate the design part of your brain.',
  },
  {
    id: 'noted',
    order: 4,
    title: 'Noted',
    slug: `${ROUTE.STORIES}/noted`,
    description: 'Get our take on topics that have the design world talking.',
  },
  {
    id: 'process',
    order: 5,
    title: 'Process',
    slug: `${ROUTE.STORIES}/process`,
    description: 'Explore our ways of working.',
  },
  {
    id: 'listen',
    order: 6,
    title: 'Listen',
    slug: `${ROUTE.STORIES}/listen`,
    description: 'Playlists, podcasts, and other audio goodness from our team.',
  },
];

export const STORIES_CATEGORIES_ORDER_ASC = STORIES_CATEGORIES.sort((a, b) =>
  a.order !== b.order ? (a.order < b.order ? -1 : 1) : 0
);
