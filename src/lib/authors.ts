import type { Author } from '@/types';

export const authors: Record<string, Author> = {
  立教太郎: {
    slug: '太郎',
    name: '太郎',
    bio: '名古屋大学志望だった理系男子。物理と数学が得意。',
    field: '理系',
  },
  おれ: {
    slug: 'おれ',
    name: 'おれ',
    bio: '国語と小論文が得意な文系。人文系に強い。',
    field: '文系',
  },
  あなた: {
    slug: 'あなた',
    name: 'あなた',
    bio: '最強のエンジニア志望。C言語とPythonに挑戦中。',
    field: '理系',
  },
};
