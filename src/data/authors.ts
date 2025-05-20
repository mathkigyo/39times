import type { Author } from '@/types';

export type AuthorInfo = {
  name: string;
  description: string;
  type: string;
};

export const authors: Record<string, Author> = {
  えいしょう: {
    slug: 'えいしょう',
    name: 'えいしょう',
    bio: '名古屋大学志望だった理系男子',
    field: '理系',
  },
  おれ: {
    slug: 'おれ',
    name: 'おれ',
    bio: '国語と小論文が得意な文系人間',
    field: '文系',
  },
  あなた: {
    slug: 'あなた',
    name: 'あなた',
    bio: '最強のエンジニア志望',
    field: '理系',
  },
};