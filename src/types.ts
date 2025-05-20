// src/types.ts

export type Author = {
  slug: string;
  name: string;
  bio: string;
  field: '文系' | '理系';
};

export type Post = {
  title: string;
  slug: string;
  date: string;
  author: string; // slug でOK
  tags: string[];
  content: string;
  excerpt?: string;
  pv?: number;
};
